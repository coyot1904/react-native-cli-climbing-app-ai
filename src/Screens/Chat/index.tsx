import React, { useState, useCallback } from 'react';
import {
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import {
  View,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';
import { askClimbingAI } from '../../Assets/apiService';
import { ChatScreenProps } from '../../Types/navigationTypes';

import EmptyChat from '../../Components/EmptyChat';
import { renderBubble } from '../../Components/ChatBubble';

const ChatScreen: React.FC<ChatScreenProps> = ({ navigation }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const onSend = useCallback(async (newMessages: IMessage[] = []) => {
    setMessages(prev => GiftedChat.append(prev, newMessages));
    setIsTyping(true);
    const userText = newMessages[0]?.text || '';
    const aiResponse = await askClimbingAI(userText);

    const botMessage: IMessage = {
      _id: Math.random().toString(),
      text: aiResponse.message,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Climbing Guru',
        avatar: 'https://cdn-icons-png.flaticon.com/512/1995/1995562.png',
      },
      image:
        aiResponse.showImages && aiResponse.images?.length > 0
          ? aiResponse.images[0]
          : undefined,
    };
    setIsTyping(false);
    setMessages(prev => GiftedChat.append(prev, [botMessage]));
  }, []);

  const renderInputToolbar = (props: any) => (
    <InputToolbar
      {...props}
      containerStyle={styles.inputBar}
      // eslint-disable-next-line react-native/no-inline-styles
      primaryStyle={{ alignItems: 'center' }}
    />
  );

  const renderSend = (props: any) => {
    return (
      <Send {...props} containerStyle={styles.sendContainer}>
        <View style={styles.sendBox}>
          <Text style={styles.sendBtnIcon}>➤</Text>
        </View>
      </Send>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🏔️ Summit Intelligence</Text>

        {/* 🗺️ Map Navigation Button */}
        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => navigation.navigate('Map')} // Ensure 'MapScreen' matches your navigation type name
          activeOpacity={0.7}
        >
          <Text style={styles.mapIcon}>🧭</Text>
        </TouchableOpacity>
      </View>
      <GiftedChat
        messages={messages}
        isTyping={isTyping}
        renderBubble={renderBubble}
        // eslint-disable-next-line @typescript-eslint/no-shadow
        onSend={messages => onSend(messages)}
        user={{ _id: 1 }}
        renderInputToolbar={renderInputToolbar}
        renderChatEmpty={() => <EmptyChat />}
        renderSend={renderSend}
        textInputProps={{
          style: {
            color: '#FFFFFF', // 👈 typed text color
            fontSize: 16,
          },
          placeholderTextColor: '#7C8AA5',
        }}
        renderFooter={() =>
          isTyping ? (
            <Text style={styles.typingIndicator}>
              🧠 Climbing Guru is planning your route...
            </Text>
          ) : null
        }
      />
    </View>
  );
};

export default ChatScreen;

/* 🎨 Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1220', // deep navy mountain night
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
  },

  typingIndicator: {
    color: '#7C8AA5',
    marginLeft: 20,
  },

  sendBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },

  sendBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FF8A3D', // warm climbing orange
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF8A3D',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
    color: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    // 👇 Add this line to flip the view back
    transform: [{ scaleY: -1 }],
    paddingBottom: 30,
  },

  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },

  emptySubtitle: {
    color: '#7C8AA5',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1A2436',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2A3A55',
  },

  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 24,
    gap: 10,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF8A3D33', // 20% opacity orange
    backgroundColor: '#FF8A3D11',
  },

  chipText: {
    color: '#FF8A3D',
    fontSize: 12,
    fontWeight: '600',
  },

  // Make the input bar look like a floating island
  inputBar: {
    backgroundColor: '#1A2436',
    borderTopWidth: 0,
    borderRadius: 25,
    marginHorizontal: 15,
    marginBottom: 15,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: '#2A3A55',
  },
  sendBtnIcon: {
    marginLeft: 3,
    fontSize: 22,
  },
  sendContainer: {},
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 25,
    paddingBottom: 18,
    paddingHorizontal: 20,
    backgroundColor: '#0B1220',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // 👈 This pushes the logo left and map right

    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },

  logo: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  mapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A2436', // matches your input bar / icon circle style
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A3A55',
  },

  mapIcon: {
    fontSize: 20,
  },
});
