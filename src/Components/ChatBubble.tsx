import React from 'react';
import { Bubble, BubbleProps, IMessage } from 'react-native-gifted-chat';

export const renderBubble = (props: BubbleProps<IMessage>) => (
  <Bubble
    {...props}
    wrapperStyle={{
      right: { backgroundColor: '#FF8A3D', padding: 4, borderRadius: 18 },
      left: {
        backgroundColor: '#1A2436',
        borderWidth: 1,
        borderColor: '#2A3A55',
        padding: 4,
        borderRadius: 18,
      },
    }}
    textStyle={{
      right: { color: '#fff' },
      left: { color: '#E5E7EB' },
    }}
  />
);
