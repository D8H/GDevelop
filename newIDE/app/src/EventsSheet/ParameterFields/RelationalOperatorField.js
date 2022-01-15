// @flow
import { Trans } from '@lingui/macro';
import { t } from '@lingui/macro';
import React, { Component } from 'react';
import { type ParameterInlineRendererProps } from './ParameterInlineRenderer.flow';
import { type ParameterFieldProps } from './ParameterFieldCommons';
import RadioButtonGroup from '../../UI/RadioButtonGroup';

const operatorLabels = {
  '=': t`= (equal to)`,
  '<': t`< (less than)`,
  '>': t`> (greater than)`,
  '<=': t`≤ (less or equal to)`,
  '>=': t`≥ (greater or equal to)`,
  '!=': t`≠ (not equal to)`,
};

const operatorSymbols = {
  '=': t`=`,
  '<': t`<`,
  '>': t`>`,
  '<=': t`≤`,
  '>=': t`≥`,
  '!=': t`≠`,
};

const mapTypeToOperators: { [string]: Array<string> } = {
  unknown: Object.keys(operatorLabels),
  number: ['=', '!=', '<', '<=', '>=', '>'],
  time: ['<', '<=', '>=', '>'],
  string: ['=', '!='],
  color: ['=', '!='],
};

export default class RelationalOperatorField extends Component<ParameterFieldProps> {
  _field: ?SelectField;
  focus() {
    if (this._field && this._field.focus) this._field.focus();
  }

  render() {
    const { parameterMetadata } = this.props;
    const description = parameterMetadata
      ? parameterMetadata.getDescription()
      : undefined;

    const comparedValueType = parameterMetadata
      ? parameterMetadata.getExtraInfo()
      : 'unknown';
    const operators =
      mapTypeToOperators[comparedValueType] || mapTypeToOperators.unknown;

    return (
      <RadioButtonGroup
        margin={this.props.isInline ? 'none' : 'dense'}
        fullWidth
        value={this.props.value}
        onChange={(value: string) => this.props.onChange(value)}
        values={operators.map(value => ({
          value: value,
          label: operatorSymbols[value],
        }))}
        ref={field => (this._field = field)}
        hintText={t`Choose an operator`}
      />
    );
  }
}

export const renderInlineRelationalOperator = ({
  value,
  InvalidParameterValue,
}: ParameterInlineRendererProps) => {
  if (!value) {
    return (
      <InvalidParameterValue isEmpty>
        <Trans>Choose an operator</Trans>
      </InvalidParameterValue>
    );
  }

  if (
    value !== '=' &&
    value !== '<' &&
    value !== '>' &&
    value !== '<=' &&
    value !== '>=' &&
    value !== '!='
  ) {
    return <InvalidParameterValue>{value}</InvalidParameterValue>;
  }

  if (value === '<=') return '\u2264';
  if (value === '>=') return '\u2265';
  else if (value === '!=') return '\u2260';

  return value;
};
