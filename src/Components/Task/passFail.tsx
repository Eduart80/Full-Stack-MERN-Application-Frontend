import React from "react";

interface TaskPassFailProps {
  showOptions?: boolean;
}

const TaskPassFail: React.FC<TaskPassFailProps> = ({ showOptions = false }) => {
  const [selected, setSelected] = React.useState("");
  
  if (!showOptions) return null;
  
  const getButtonClass = () => {
    if (selected === "pass") return "btn btn-sm btn-success mb-2";
    if (selected === "fail") return "btn btn-sm btn-danger mb-2";
    return "btn btn-sm btn-secondary mb-2";
  };
  
  return (
    <select 
      className={getButtonClass()}
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
    >
      <option value="">Select...</option>
      <option value="pass">Pass</option>
      <option value="fail">Fail</option>
    </select>
  );
};

export default TaskPassFail
 
