import { useState, useEffect, useRef, useCallback } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { ActiveSession, Coordinate } from '../Types/trackTypes';

const LOCATION_OPTIONS = {
  enableHighAccuracy: true,
  distanceFilter: 5, // meters — only update if moved 5m
  interval: 3000, // ms
  fastestInterval: 1000,
};

function haversineDistance(a: Coordinate, b: Coordinate): number {
  const R = 6371; // km
  const dLat = ((b.latitude - a.latitude) * Math.PI) / 180;
  const dLon = ((b.longitude - a.longitude) * Math.PI) / 180;
  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);
  const c =
    2 *
    Math.asin(
      Math.sqrt(
        sinDLat * sinDLat +
          Math.cos((a.latitude * Math.PI) / 180) *
            Math.cos((b.latitude * Math.PI) / 180) *
            sinDLon *
            sinDLon,
      ),
    );
  return R * c;
}

export function useTracking(trailId: string) {
  const [session, setSession] = useState<ActiveSession>({
    trailId,
    startTime: 0,
    elapsedSeconds: 0,
    currentPosition: null,
    distanceCovered: 0,
    currentElevation: 0,
    currentSpeed: 0,
    avgSpeed: 0,
    recordedPath: [],
    isPaused: false,
  });

  const [isActive, setIsActive] = useState(false);
  const watchIdRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastPositionRef = useRef<Coordinate | null>(null);

  // Tick the elapsed timer every second
  useEffect(() => {
    if (isActive && !session.isPaused) {
      timerRef.current = setInterval(() => {
        setSession(prev => ({
          ...prev,
          elapsedSeconds: prev.elapsedSeconds + 1,
        }));
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, session.isPaused]);

  const handlePositionUpdate = useCallback(
    (position: {
      coords: {
        latitude: number;
        longitude: number;
        altitude: number | null;
        speed: number | null;
      };
    }) => {
      if (session.isPaused) return;

      const coord: Coordinate = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        altitude: position.coords.altitude ?? undefined,
        timestamp: Date.now(),
      };

      setSession(prev => {
        let addedDistance = 0;
        if (lastPositionRef.current) {
          addedDistance = haversineDistance(lastPositionRef.current, coord);
        }
        lastPositionRef.current = coord;

        const newDistance = prev.distanceCovered + addedDistance;
        const elapsedHours = prev.elapsedSeconds / 3600;
        const avgSpeed = elapsedHours > 0 ? newDistance / elapsedHours : 0;
        const currentSpeed =
          position.coords.speed != null
            ? position.coords.speed * 3.6 // m/s → km/h
            : avgSpeed;

        return {
          ...prev,
          currentPosition: coord,
          currentElevation: coord.altitude ?? prev.currentElevation,
          distanceCovered: newDistance,
          currentSpeed: Math.round(currentSpeed * 10) / 10,
          avgSpeed: Math.round(avgSpeed * 10) / 10,
          recordedPath: [...prev.recordedPath, coord],
        };
      });
    },
    [session.isPaused],
  );

  const startTracking = useCallback(() => {
    setIsActive(true);
    setSession(prev => ({
      ...prev,
      startTime: Date.now(),
      elapsedSeconds: 0,
      distanceCovered: 0,
      recordedPath: [],
      isPaused: false,
    }));

    watchIdRef.current = Geolocation.watchPosition(
      handlePositionUpdate,
      error => console.warn('GPS error:', error),
      LOCATION_OPTIONS,
    );
  }, [handlePositionUpdate]);

  const pauseTracking = useCallback(() => {
    setSession(prev => ({ ...prev, isPaused: true }));
  }, []);

  const resumeTracking = useCallback(() => {
    setSession(prev => ({ ...prev, isPaused: false }));
  }, []);

  const stopTracking = useCallback(() => {
    if (watchIdRef.current !== null) {
      Geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsActive(false);
    setSession(prev => ({ ...prev, isPaused: false }));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        Geolocation.clearWatch(watchIdRef.current);
      }
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return {
    session,
    isActive,
    startTracking,
    pauseTracking,
    resumeTracking,
    stopTracking,
  };
}

// Utility: format seconds → "HH:MM:SS"
export function formatDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) {
    return `${h}h ${m.toString().padStart(2, '0')}m`;
  }
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
