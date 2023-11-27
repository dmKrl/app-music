import { Popup, PopupText } from '../Main/CenterBlockFilter.styles';

function PopupFilter(props) {
  const { track, id } = props;
  console.log(track);
  return (
    <Popup className="popup">
      <PopupText className="popup-text" id={id} onClick={console.log('click')}>
        {track}
      </PopupText>
    </Popup>
  );
}

export default PopupFilter;
