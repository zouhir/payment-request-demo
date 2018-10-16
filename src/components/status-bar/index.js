import { h, Component } from "preact";
import style from './style'

import iconSettings from '../../assets/icon-settings.svg';

class SettingsBar extends Component {
  render(props) {
    return (
        <div class={style.container}>
            <div class={style.message}>
                {props.status}
            </div>
            <div class={style.toggle}>
                <button onClick={props.toggleSettings}>
                    <img src={iconSettings} />
                </button>
            </div>
        </div>
    )
  }
}

export default SettingsBar;
