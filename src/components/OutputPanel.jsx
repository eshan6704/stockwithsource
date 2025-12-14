import '../styles/OutputPanel.css'

function OutputPanel({ currentSide, backendOutput, frontendTables }) {
  return (
    <>
      <div
        className="output-panel"
        style={{ display: currentSide === 'backend' ? 'block' : 'none' }}
      >
        <h3>Backend Output</h3>
        {backendOutput.length === 0 ? (
          <p>No data yet.</p>
        ) : (
          backendOutput.map((block, index) => (
            <div key={index}>
              <div dangerouslySetInnerHTML={{ __html: block }} />
              {index < backendOutput.length - 1 && <hr />}
            </div>
          ))
        )}
      </div>

      <div
        className="output-panel"
        style={{ display: currentSide === 'frontend' ? 'block' : 'none' }}
      >
        <h3>Frontend Extracted Tables</h3>
        {frontendTables.length === 0 ? (
          <p>No tables yet.</p>
        ) : (
          frontendTables.map((table, index) => (
            <div key={index}>
              <div dangerouslySetInnerHTML={{ __html: table }} />
              {index < frontendTables.length - 1 && <hr />}
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default OutputPanel
