import { useState, useEffect } from 'react'
import TopBar from './components/TopBar'
import OutputPanel from './components/OutputPanel'
import { useGradioClient } from './hooks/useGradioClient'
import './styles/App.css'

const reqOptions = {
  stock: [
    "info", "intraday", "daily", "nse_eq", "qresult", "result", "balance",
    "cashflow", "dividend", "split", "other", "stock_hist"
  ],
  index: [
    "indices", "nse_open", "nse_preopen", "nse_fno", "nse_fiidii", "nse_events",
    "nse_future", "nse_bhav", "nse_highlow", "index_history", "nse_largedeals",
    "nse_most_active", "largedeals_historical", "nse_bulkdeals",
    "nse_blockdeals", "index_pe_pb_div", "index_total_returns"
  ]
}

function App() {
  const [mode, setMode] = useState('stock')
  const [symbol, setSymbol] = useState('ITC')
  const [reqType, setReqType] = useState('info')
  const [date, setDate] = useState('')
  const [sourceType, setSourceType] = useState('colab')
  const [backendURL, setBackendURL] = useState('')
  const [currentSide, setCurrentSide] = useState('backend')
  const [backendOutput, setBackendOutput] = useState([])
  const [frontendTables, setFrontendTables] = useState([])
  const [status, setStatus] = useState('stock,info,ITC | Colab | ')

  const { connectClient, fetchData } = useGradioClient(sourceType, backendURL)

  useEffect(() => {
    const d = new Date()
    d.setDate(d.getDate() - 1)
    setDate(d.toISOString().split('T')[0])
  }, [])

  useEffect(() => {
    setReqType(reqOptions[mode][0])
  }, [mode])

  useEffect(() => {
    if (sourceType === 'hf') {
      setBackendURL('eshan6704/backend')
    } else {
      setBackendURL('')
    }
  }, [sourceType])

  const handleModeChange = (newMode) => {
    setMode(newMode)
    if (newMode === 'index') {
      setSymbol('NIFTY 50')
    } else {
      setSymbol('ITC')
    }
    setBackendOutput([])
    setFrontendTables([])
  }

  const handleFetch = async () => {
    const formattedDate = date.split('-').reverse().join('-')
    const srcLabel = sourceType === 'colab' ? 'Colab' : 'Hugging Face'
    const url = sourceType === 'hf' ? 'eshan6704/backend' : backendURL.trim()
    setStatus(`${mode},${reqType},${symbol},${formattedDate} | ${srcLabel} | ${url}`)

    setBackendOutput([])
    setFrontendTables([])

    const blocks = await fetchData(mode, reqType, symbol, formattedDate)

    setBackendOutput(blocks)

    const tables = blocks.flatMap(block => {
      const temp = document.createElement('div')
      temp.innerHTML = block
      return Array.from(temp.querySelectorAll('table')).map(tbl => tbl.outerHTML)
    })

    setFrontendTables(tables)
  }

  return (
    <div className="app">
      <TopBar
        mode={mode}
        onModeChange={handleModeChange}
        symbol={symbol}
        onSymbolChange={setSymbol}
        reqType={reqType}
        onReqTypeChange={setReqType}
        reqOptions={reqOptions[mode]}
        date={date}
        onDateChange={setDate}
        sourceType={sourceType}
        onSourceTypeChange={setSourceType}
        backendURL={backendURL}
        onBackendURLChange={setBackendURL}
        currentSide={currentSide}
        onSideChange={setCurrentSide}
        onFetch={handleFetch}
        status={status}
      />
      <OutputPanel
        currentSide={currentSide}
        backendOutput={backendOutput}
        frontendTables={frontendTables}
      />
    </div>
  )
}

export default App
