import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col, Button, Stack } from 'react-bootstrap';

import { useStore } from './hooks/useStore';
import './App.css'
import { AUTO_LANGUAGES } from './constants';
import { ArrowsIcon } from './components/Icons';
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
            <TextArea type={SectionType.To} loading={loading} value={result} onChange={setResult} />


          </Stack>
        </Col>
      </Row>

    </Container >
  )
}

export default App
