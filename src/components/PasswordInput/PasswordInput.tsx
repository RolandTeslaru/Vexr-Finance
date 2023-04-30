import { useState } from 'react';
import { TbX, TbCheck} from "react-icons/tb"
import { PasswordInput, Progress, Text, Popover, Box } from '@mantine/core';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text
      color={meets ? 'teal' : 'red'}
      sx={{ display: 'flex', alignItems: 'center' }}
      mt={7}
      size="sm"
    >
      {meets ? <TbCheck size="0.9rem" /> : <TbX size="0.9rem" />} <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

interface PasswordCheckInputProps {
    value: string;
    onChange: (event: any) => void;
    error?: false | "" | 0 | "Password should include at least 6 characters" | null | undefined;
    label?: string;
    placeholder?: string;
    radius?: string;
}

const PasswordCheckInput = ({value, onChange, error, label, placeholder, radius}: PasswordCheckInputProps) => {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
  ));

  const strength = getStrength(value);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  return (
    <Box mx="auto" w="100%">
      <Popover opened={popoverOpened} position="bottom" width="target" transitionProps={{ transition: 'pop' }}>
        <Popover.Target>
          <div
            onFocusCapture={() => setPopoverOpened(true)}
            onBlurCapture={() => setPopoverOpened(false)}
          >
            <PasswordInput
              withAsterisk
              label="Your password"
              placeholder="Your password"
              value={value}
              onChange={onChange}
            />
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          <Progress color={color} value={strength} size={5} mb="xs" />
          <PasswordRequirement label="Includes at least 6 characters" meets={value.length > 5} />
          {checks}
        </Popover.Dropdown>
      </Popover>
    </Box>
  );
}
export default PasswordCheckInput