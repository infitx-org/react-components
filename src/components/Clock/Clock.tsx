import { useRef, useState, useEffect } from "react";
import classnames from "classnames";
import ScrollBox from "components/ScrollBox";
import "./Clock.scss";

function toDoubleDigit(number: number) {
  return `0${number.toString()}`.slice(-2);
}

interface TimeValueProps {
  value: number;
  count: number;
  onClick: (index: number) => void;
}

function TimeValue({ value, count, onClick }: TimeValueProps) {
  const timeValueRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (timeValueRef.current) {
      const options = timeValueRef.current.querySelectorAll(
        ".rc-clock__picker__item"
      );
      const element = Array.from(options)[value];
      element.scrollIntoView({ block: "center" });
    }
  }, [value]);

  const items = new Array(count).fill(0).map((_, index) => {
    const className = classnames([
      "rc-clock__picker__item",
      value === index && "rc-clock__picker__item--selected",
    ]);
    return (
      <div
        key={index.toString()}
        className={className}
        onClick={() => {
          onClick(index);
        }}
        role="presentation"
      >
        {toDoubleDigit(index)}
      </div>
    );
  });
  return (
    <div className="rc-clock__picker" ref={timeValueRef}>
      <ScrollBox
        handleStyle={{ borderRadius: "3px" }}
        trackStyle={{
          top: "2px",
          bottom: "2px",
          right: "0px",
          width: "3px",
        }}
      >
        {items}
      </ScrollBox>
    </div>
  );
}

export interface ClockProps {
  hour?: number;
  minute?: number;
  second?: number;
  onChange: (hour: number, minute: number, second: number) => void;
}

export default function Clock({
  hour = 0,
  minute = 0,
  second = 0,
  onChange,
}: ClockProps) {
  const [selectedHour, setSelectedHour] = useState(hour);
  const [selectedMinute, setSelectedMinute] = useState(minute);
  const [selectedSecond, setSelectedSecond] = useState(second);

  const onSelectHour = (t: number) => {
    setSelectedHour(t);
    onChange(t, minute, second);
  };
  const onSelectMinute = (t: number) => {
    setSelectedMinute(t);
    onChange(hour, t, second);
  };
  const onSelectSecond = (t: number) => {
    setSelectedSecond(t);
    onChange(hour, minute, t);
  };

  return (
    <div className="rc-clock">
      <TimeValue onClick={onSelectHour} value={selectedHour} count={24} />
      <TimeValue onClick={onSelectMinute} value={selectedMinute} count={60} />
      <TimeValue onClick={onSelectSecond} value={selectedSecond} count={60} />
    </div>
  );
}
