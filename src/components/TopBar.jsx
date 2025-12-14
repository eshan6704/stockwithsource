import '../styles/TopBar.css'

function TopBar({
  mode,
  onModeChange,
  symbol,
  onSymbolChange,
  reqType,
  onReqTypeChange,
  reqOptions,
  date,
  onDateChange,
  sourceType,
  onSourceTypeChange,
  backendURL,
  onBackendURLChange,
  currentSide,
  onSideChange,
  onFetch,
  status
}) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onFetch()
    }
  }

  return (
    <div className="top-bar">
      <button
        className={mode === 'stock' ? 'active' : ''}
        onClick={() => onModeChange('stock')}
      >
        Stock
      </button>
      <button
        className={mode === 'index' ? 'active' : ''}
        onClick={() => onModeChange('index')}
      >
        Index
      </button>

      <input
        type="text"
        value={symbol}
        onChange={(e) => onSymbolChange(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{ width: '80px' }}
      />

      <select
        value={reqType}
        onChange={(e) => onReqTypeChange(e.target.value)}
        style={{ width: '120px' }}
      >
        {reqOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
        style={{ width: '110px' }}
      />

      <button
        onClick={onFetch}
        className="fetch-btn"
      >
        Fetch
      </button>

      <select
        value={sourceType}
        onChange={(e) => onSourceTypeChange(e.target.value)}
        style={{ width: '100px' }}
      >
        <option value="colab">Colab</option>
        <option value="hf">HF</option>
      </select>

      <input
        type="text"
        value={backendURL}
        onChange={(e) => onBackendURLChange(e.target.value)}
        placeholder="Backend URL"
        style={{ width: '250px' }}
        disabled={sourceType === 'hf'}
      />

      <button
        className={currentSide === 'backend' ? 'active' : ''}
        onClick={() => onSideChange('backend')}
      >
        Backend
      </button>
      <button
        className={currentSide === 'frontend' ? 'active' : ''}
        onClick={() => onSideChange('frontend')}
      >
        Frontend
      </button>

      <div className="status-box">{status}</div>
    </div>
  )
}

export default TopBar
