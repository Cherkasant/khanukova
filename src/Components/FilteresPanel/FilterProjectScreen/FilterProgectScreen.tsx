import { Cascader, Collapse, DatePicker } from 'antd';
import { useState } from 'react';

import { ArrowDropDownIcon } from '../../../Assets/icons/ArrowDropDownIcon';
import { CalendarIcon } from '../../../Assets/icons/CalendarIcon';
import Checkbox from '../../Checkbox';
import Input from '../../Input';
import FiltersPanel from '../FiltersPanel';

import styles from './FilterProjectScreen.module.css';
import {
  LabelCheckbox,
  LastChangeCheckbox,
  PaymentCheckbox,
  PriorityCheckbox,
  ResponsibleCheckbox,
  StatusCheckbox
} from './constants';

const { Panel } = Collapse;

const FilterProjectScreen = () => {
  const [searchLabel, setSearchLabel] = useState('');
  const { RangePicker } = DatePicker;
  return (
    <FiltersPanel>
      <>
        <Collapse
          bordered={false}
          defaultActiveKey={['1']}
          className={styles.collapseContainer}
          expandIconPosition={'end'}>
          <Panel header="Labels" key="1" className={styles.panel}>
            <div className={styles.container}>
              <Input
                value={searchLabel}
                onChange={(value: string) => setSearchLabel(value)}
                placeholder={'Search labels'}
                className={styles.input}
              />
              {LabelCheckbox.map(({ label, icon, color }) => (
                <Checkbox
                  isChecked={false}
                  handleChange={() => {}}
                  label={label}
                  icon={icon}
                  color={color}
                  key={label}
                />
              ))}
            </div>
          </Panel>
          <Panel header="Status" key="2" className={styles.panel}>
            <div className={styles.container}>
              {StatusCheckbox.map(({ label }) => (
                <Checkbox isChecked={false} handleChange={() => {}} label={label} key={label} />
              ))}
            </div>
          </Panel>
          <Panel header="Payment status" key="3" className={styles.panel}>
            <div className={styles.container}>
              {PaymentCheckbox.map(({ label }) => (
                <Checkbox isChecked={false} handleChange={() => {}} label={label} key={label} />
              ))}
            </div>
          </Panel>
          <Panel header="Responsible" key="4" className={styles.panel}>
            <Cascader
              options={ResponsibleCheckbox}
              multiple={true}
              className={styles.cascader}
              popupClassName={styles.popup}
              placeholder={'Select an assignees '}
              maxTagCount={'responsive'}
              showArrow={true}
              suffixIcon={<ArrowDropDownIcon />}
            />
          </Panel>
          <Panel header="Priority" key="5" className={styles.panel}>
            <div className={styles.container}>
              {PriorityCheckbox.map(({ label }) => (
                <Checkbox isChecked={false} handleChange={() => {}} label={label} key={label} />
              ))}
            </div>
          </Panel>
          <Panel header="Last change" key="6" className={styles.panel}>
            <div className={styles.container}>
              {LastChangeCheckbox.map(({ label }) => (
                <Checkbox isChecked={false} handleChange={() => {}} label={label} key={label} />
              ))}
            </div>
          </Panel>
        </Collapse>
        <RangePicker
          format="DD.MM.YYYY"
          suffixIcon={<CalendarIcon />}
          separator={'-'}
          key="7"
          className={styles.rangePicker}
        />
      </>
    </FiltersPanel>
  );
};

export default FilterProjectScreen;
