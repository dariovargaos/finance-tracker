import {
  Box,
  Tabs,
  TabList,
  Tab,
  useBreakpointValue,
  Select,
} from "@chakra-ui/react";

interface MonthPickerProps {
  changeFilter: (newFilter: string) => void;
  currentFilter: string | null;
}

const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function MonthPicker({
  changeFilter,
  currentFilter,
}: MonthPickerProps) {
  const handleClick = (newFilter: string) => {
    changeFilter(newFilter);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilter = e.target.value;
    changeFilter(newFilter);
  };

  const isSmallScreen: boolean | undefined = useBreakpointValue({
    base: true,
    sm: true,
    md: true,
    lg: false,
  });

  const activeIndex =
    currentFilter !== null ? months.indexOf(currentFilter) : -1;
  return (
    <Box display="flex" justifyContent="center">
      {!isSmallScreen && (
        <Tabs colorScheme="whatsapp" isLazy index={activeIndex}>
          <TabList>
            {months.map((month) => (
              <Tab key={month} onClick={() => handleClick(month)}>
                {month}
              </Tab>
            ))}
          </TabList>
        </Tabs>
      )}

      {isSmallScreen && (
        <Select
          placeholder="Pick a month"
          onChange={handleChange}
          value={currentFilter || ""}
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </Select>
      )}
    </Box>
  );
}
