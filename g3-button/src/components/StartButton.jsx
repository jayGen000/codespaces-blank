export default function StartButton({ visible }) {
  return (
    <div 
      className={`start-button ${visible ? 'visible' : ''}`}
      onClick={() => console.log('Started!')}
    >
      START
    </div>
  )
}