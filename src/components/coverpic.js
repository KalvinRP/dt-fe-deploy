import cover from './asset/coverpic.jpg';

function Cover() {
  return (
    <div style={{zIndex: '-1', backgroundBlendMode:'luminosity'}}>
      <img
        alt='cover'
        src={cover}
        width="100%"
        position="relative"
        // objectFit="cover"
      />
    </div>
  )
}

export default Cover;