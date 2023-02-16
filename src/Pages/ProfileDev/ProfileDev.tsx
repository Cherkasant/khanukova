import React, { useState } from "react";
import styles from "./ProfileDev.module.css";
import PuzzleButton, { PuzzleButtonTypes } from "../../Components/PuzzleButton";
import Input from "../../Components/Input";
import Title from "../../Components/Title";
import { PencilIcon } from "../../Assets/Profile/PencilIcon";
import Dropdown from "react-dropdown";
import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import { CalendarIcon } from "../../Assets/icons/CalendarIcon";

const ProfileDev = () => {
  const [name, setName] = useState("Ivanova Irina");
  const [nickName, setNickName] = useState("");
  const [positions, setPositions] = useState("CEO");
  const [company, setCompany] = useState("CAPIX");
  const [email, setEmail] = useState("irina@gmail.com");
  const [phone, setPhone] = useState("+375 (29) 758-78-47");
  const [telegram, setTelegram] = useState("");

  const [level, setLevel] = useState("");
  const [rate, setRate] = useState("");

  const [projects, setProjects] = useState("");
  const [stack, setStack] = useState("");
  const [experience, setExperience] = useState("");

  const [info, setInfo] = useState("");

  const currencyOptions = [
    { value: "EUR", label: "EUR" },
    { value: "USD", label: "USD" },
  ];

  const [selectedCurrencyOptions, setSelectedCurrencyOptions] =
    useState<any>(null);

  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Russian", label: "Russian" },
  ];

  const [selectedLanguageOptions, setSelectedLanguageOptions] =
    useState<any>(null);

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const isHead = true;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title name={"My Profile"} className={styles.title} />
      </div>
      <div className={styles.containerBlockWithBtn}>
        <div className={styles.containerInfo}>
          <div className={styles.containerPhoto}>
            <h2 className={styles.subTitle}>Account photo</h2>
            <div className={styles.photo}></div>
            <div className={styles.description}>
              Edit photo <PencilIcon />
            </div>
          </div>

          <div className={styles.containerContactInfo}>
            <div>
              <h2 className={styles.subTitle}>Contact info</h2>

              <div className={styles.containerInput}>
                <Input
                  title={"Full name"}
                  type={"text"}
                  value={name}
                  onChange={(value) => setName(value)}
                  placeholder={"Full name"}
                  className={styles.input}
                />

                <Input
                  title={"Nick name"}
                  type={"text"}
                  value={nickName}
                  onChange={(value) => setNickName(value)}
                  placeholder={"Nick name"}
                  className={styles.input}
                />

                <Input
                  title={"Company"}
                  type={"text"}
                  value={company}
                  onChange={(value) => setCompany(value)}
                  placeholder={"Company"}
                  disabled
                  className={styles.input}
                />
                <Input
                  title={"Positions"}
                  type={"text"}
                  value={positions}
                  onChange={(value) => setPositions(value)}
                  placeholder={"Positions"}
                  disabled
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.containerInput}>
              <Input
                title={"Email"}
                type={"email"}
                value={email}
                onChange={(value) => setEmail(value)}
                placeholder={"Email"}
                className={styles.input}
              />

              <Input
                title={"Phone number "}
                type={"tel"}
                value={phone}
                onChange={(value) => setPhone(value)}
                placeholder={"Phone"}
                className={styles.input}
              />

              <Input
                title={"Telegram"}
                type={"text"}
                value={telegram}
                onChange={(value) => setTelegram(value)}
                placeholder={"Enter the profile link telegram"}
                className={styles.input}
              />
            </div>
          </div>
        </div>
      </div>

      {isHead && (
        <div className={styles.containerHead}>
          <h2 className={styles.subTitle}>Info for Head</h2>

          <div className={styles.blockHead}>
            <div className={styles.containerInputHead}>
              <Input
                title={"Position Level"}
                type={"text"}
                value={level}
                onChange={(value) => setLevel(value)}
                placeholder={"Select position"}
                className={styles.input}
              />

              <div className={styles.containerRate}>
                <Input
                  title={"Rate"}
                  type={"text"}
                  value={rate}
                  onChange={(value) => setRate(value)}
                  placeholder={"10.00"}
                  className={styles.inputRate}
                />

                <Dropdown
                  options={currencyOptions}
                  onChange={setSelectedCurrencyOptions}
                  value={selectedCurrencyOptions}
                  placeholder="USD"
                  className={styles.dropdownContainer}
                  controlClassName={styles.dropdownControl}
                  placeholderClassName={styles.dropdownPlaceholder}
                  arrowClosed={<span className={styles.arrowClosed} />}
                  arrowOpen={<span className={styles.arrowOpen} />}
                  menuClassName={styles.dropdownMenu}
                />
              </div>

              <div>
                <div className={styles.inputTitle}>Language</div>

                <Dropdown
                  options={languageOptions}
                  onChange={setSelectedLanguageOptions}
                  value={selectedLanguageOptions}
                  placeholder="Select language"
                  className={styles.dropdownContainer}
                  controlClassName={styles.dropdownControl}
                  placeholderClassName={styles.dropdownPlaceholder}
                  arrowClosed={<span className={styles.arrowClosed} />}
                  arrowOpen={<span className={styles.arrowOpen} />}
                  menuClassName={styles.dropdownMenu}
                />
              </div>

              <div>
                <div className={styles.inputTitle}>Date of birth</div>
                <Space direction="vertical" className={styles.datePicker}>
                  <DatePicker
                    format="DD.MM.YYYY"
                    placeholder="Select date"
                    suffixIcon={<CalendarIcon />}
                    onChange={onChange}
                    className={styles.inputDatePicker}
                  />
                </Space>
              </div>
            </div>

            <div className={styles.containerInputHead}>
              <Input
                title={"Projects"}
                type={"text"}
                value={projects}
                onChange={(value) => setProjects(value)}
                placeholder={"Text"}
                className={styles.inputBigLong}
              />

              <Input
                title={"Tech Stack"}
                type={"text"}
                value={stack}
                onChange={(value) => setStack(value)}
                placeholder={"Text"}
                className={styles.inputBigLong}
              />
            </div>

            <div className={styles.containerInputHead}>
              <Input
                title={"Experience"}
                type={"text"}
                value={experience}
                onChange={(value) => setExperience(value)}
                placeholder={"Text"}
                className={styles.inputBig}
              />

              <Input
                title={"Personal info"}
                type={"text"}
                value={info}
                onChange={(value) => setInfo(value)}
                placeholder={"Text"}
                className={styles.inputBig}
              />
            </div>
          </div>
        </div>
      )}
      <div className={styles.buttonsBlock}>
        <PuzzleButton
          title={"Cancel"}
          type={PuzzleButtonTypes.TextButton}
          onClick={() => {}}
          className={styles.buttonCancel}
        />

        <PuzzleButton
          title={"Save"}
          type={PuzzleButtonTypes.TextButton}
          onClick={() => {}}
          className={styles.buttonSave}
        />
      </div>
    </div>
  );
};

export default ProfileDev;
