import { FormGroup, Input } from "reactstrap";

export function MoneyOptions({ value, onChange, moneys = [], ...props }) {
  return (
    <FormGroup>
      <Input
        {...props}
        type="select"
        className="border-top-0 border-start-0 border-end-0 border-info"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option>Select..</option>
        {moneys.map(({ code }) => (
          <option key={code}>{code}</option>
        ))}
      </Input>
    </FormGroup>
  );
}
