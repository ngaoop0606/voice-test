import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Voice from '@react-native-voice/voice';

const App = () => {
  const [recognized, setRecognized] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e) => {
    setStarted('√');
  };

  const onSpeechEnd = (e) => {
    console.log("start")
    setRecognized('√');
    if (isRecording) {
      stopRecognizing();
    }
  };

  const onSpeechResults = (e) => {
    setResults(e.value);
  };

  const startRecognizing = async () => {
    try {
      await Voice.start('en-US');
      console.log('Voice started');
      setRecognized('');
      setStarted('');
      setResults([]);
      setIsRecording(true);
    } catch (e) {
      console.error(e);
    }
  };

  const startAutoStopRecognizing = async () => {
    try {
      await Voice.start('en-US');
      console.log("startAutoStopRecognizing ")
      setRecognized('');
      setStarted('');
      setResults([]);
      setIsRecording(false);
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    try {
      await Voice.stop();
      setIsRecording(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.stat}>Started: {started}</Text>
      <Text style={styles.stat}>Recognized: {recognized}</Text>
      <Text style={styles.stat}>Results:</Text>
      {results.map((result, index) => (
        <Text key={index} style={styles.resultText}>
          {result}
        </Text>
      ))}
      <Button
        title="Start Auto-Stop Recording"
        onPress={startAutoStopRecognizing}
        disabled={isRecording}
      />
      <Button
        title="Start Recording"
        onPress={startRecognizing}
        disabled={isRecording}
      />
      <Button
        title="Stop Recording"
        onPress={stopRecognizing}
        disabled={!isRecording}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
    marginTop: 30,
  },
  resultText: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
    marginTop: 10,
  },
});

export default App;
