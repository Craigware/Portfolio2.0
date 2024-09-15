const Dood = ({src, x, y, scrollInformation}) => {
  const runFrame = [
    
  ];
  let i = 0;

  return(
    <div className="dood" style={{left: x, top: y, transform: 'translate(-50%, -50%)'}}>
      <img src={src} />
      { (running) ?
        <img src={ runFrame[i] } />
        :
        null }
    </div>
  );
}

export default Dood;