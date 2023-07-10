import React from "react";
import { Chip, FormControl, Stack, TextField } from "@mui/material";

export const CustomSelectChipField = ({ name, label = "", val, setVal }) => {
  const handleDelete = (value) => {
    setVal({ ...val, [name]: val?.[name]?.filter((item) => item !== value) });
  };

  return (
    <FormControl fullWidth className="my-3">
      <Stack gap={1} direction="row" flexWrap="wrap">
        {val?.[name]?.map((value) => (
          <Chip
            key={value}
            label={value}
            onDelete={() => handleDelete(value)}
          />
        ))}
      </Stack>
      <TextField
        variant="standard"
        label={label}
        size="small"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setVal({ ...val, tags: [...val[name], e.target.value] });
          }
        }}
        fullWidth
      />
    </FormControl>
  );
};
