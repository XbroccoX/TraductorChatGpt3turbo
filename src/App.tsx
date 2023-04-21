import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col, Button, Stack } from 'react-bootstrap';

import { useStore } from './hooks/useStore';
import './App.css'
import { AUTO_LANGUAGES, VOICE_FOR_LANGUAGE } from './constants';
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/Icons';
import { LanguageSelector } from './components/LanguageSelector';
import { SectionType } from './types.d';
import { TextArea } from './components/TextArea';
import { useEffect } from 'react';
import { translate } from './services/translate';
import { useDebounce } from './hooks/useDebounce';




function App() {

  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    //Methods
    interchangeLanguages,
    setToLanguage,
    setFromLanguage,
    setFromText,
    setResult
  } = useStore();

  const debouncedFromText = useDebounce(fromText, 250)

  useEffect(() => {
    if (fromText === '') return

    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then(result => {
        if (result == null) return
        setResult(result)
      })
      .catch(() => setResult('Error'))

  }, [fromText, fromLanguage, toLanguage])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => { });
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result);
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage];
    const voice = speechSynthesis.getVoices().find(v => v.name === 'Karen');
    utterance.voice = voice || null;
    speechSynthesis.speak(utterance)

  }


  return (
    <Container fluid>
      <h1>Google translate</h1>

      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type='from'
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea type={SectionType.From} value={fromText} onChange={setFromText} />

          </Stack>
        </Col>

        <Col xs='auto'>
          <Button
            variant='link'
            disabled={fromLanguage === AUTO_LANGUAGES}
            onClick={interchangeLanguages}
          >
            <ArrowsIcon />
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type='to'
              value={toLanguage}
              onChange={setToLanguage}
            />
            <div style={{ position: 'relative' }}>
              <TextArea type={SectionType.To} loading={loading} value={result} onChange={setResult} />
              <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>
                <Button
                  variant='link'
                  onClick={handleSpeak}
                >
                  <SpeakerIcon />
                </Button>
                <Button
                  variant='link'
                  onClick={handleClipboard}
                >
                  <ClipboardIcon />
                </Button>

              </div>
            </div>


          </Stack>
        </Col>
      </Row>

    </Container >
  )
}

export default App
