// @flow
import * as React from 'react';
import { I18n } from '@lingui/react';
import { type MessageDescriptor } from '../Utils/i18n/MessageDescriptor.flow';
import { focusButton } from './Button';
import RaisedButton from './RaisedButton';
import FlatButton from './FlatButton';
import Text from './Text';
import { Line, Column } from './Grid';

type Props = {|
  onChange: string => void,
  value: string,
  values: Array<{ value: string, label: MessageDescriptor }>,
|};

const styles = {
  button: {
    margin: 0,
  },
  description: {
    marginRight: 5,
  },
};

export default class RadioButtonGroup extends React.Component<Props, {||}> {
  _firstButton = React.createRef<RaisedButton>();

  focus() {
    focusButton(this._firstButton);
  }

  render() {
    const { values } = this.props;
    const onChange = this.props.onChange || undefined;

    return (
      <I18n>
        {({ i18n }) => (
          <Column noMargin>
            <Line>
              {values.map((element, index) => {
                if (this.props.value === element.value) {
                  return (
                    <Column noMargin>
                      <RaisedButton
                        style={styles.button}
                        label={i18n._(element.label)}
                        primary={this.props.value === element.value}
                        onClick={() => onChange(element.value)}
                        ref={index === 0 ? this._firstButton : undefined}
                      />
                    </Column>
                  );
                }
                else {
                  return (
                    <Column noMargin>
                      <FlatButton
                        style={styles.button}
                        label={i18n._(element.label)}
                        primary={this.props.value === element.value}
                        onClick={() => onChange(element.value)}
                        ref={index === 0 ? this._firstButton : undefined}
                      />
                    </Column>
                  );
                }
              })}
            </Line>
          </Column>
        )}
      </I18n>
    );
  }
}
