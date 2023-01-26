import React, { useState } from "react";
import { Collapse } from "antd";
import Checkbox from "../../Checkbox";
import FiltersPanel from "../FiltersPanel";
import Input from "../../Input";
import styles from "./FilterProjectScreen.module.css";
import {
  LabelCheckbox,
  LastChangeCheckbox,
  PaymentCheckbox,
  PriorityCheckbox,
  StatusCheckbox,
} from "./constants";

const { Panel } = Collapse;

const FilterProjectScreen = () => {
  const [searchLabel, setSearchLabel] = useState("");

  return (
    <FiltersPanel>
      <Collapse bordered={false} defaultActiveKey={["1"]}>
        <Panel header="Labels" key="1">
          <div className={styles.container}>
            <Input
              value={searchLabel}
              onChange={(value: string) => setSearchLabel(value)}
              placeholder={"Search labels"}
              className={styles.input}
            />
            {LabelCheckbox.map(({ label, icon, color }) => (
              <Checkbox
                isChecked={false}
                handleChange={() => {}}
                label={label}
                icon={icon}
                color={color}
              />
            ))}
          </div>
        </Panel>
        <Panel header="Status" key="2">
          <div className={styles.container}>
            {StatusCheckbox.map(({ label }) => (
              <Checkbox
                isChecked={false}
                handleChange={() => {}}
                label={label}
              />
            ))}
          </div>
        </Panel>
        <Panel header="Payment status" key="3">
          <div className={styles.container}>
            {PaymentCheckbox.map(({ label }) => (
              <Checkbox
                isChecked={false}
                handleChange={() => {}}
                label={label}
              />
            ))}
          </div>
        </Panel>
        <Panel header="Responsible" key="4"></Panel>
        <Panel header="Priority" key="5">
          <div className={styles.container}>
            {PriorityCheckbox.map(({ label }) => (
              <Checkbox
                isChecked={false}
                handleChange={() => {}}
                label={label}
              />
            ))}
          </div>
        </Panel>
        <Panel header="Last change" key="6">
          <div className={styles.container}>
            {LastChangeCheckbox.map(({ label }) => (
              <Checkbox
                isChecked={false}
                handleChange={() => {}}
                label={label}
              />
            ))}
          </div>
        </Panel>
      </Collapse>
    </FiltersPanel>
  );
};

export default FilterProjectScreen;
