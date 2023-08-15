import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  useBreakpointValue,
  Menu,
  Select,
} from "@chakra-ui/react";

const months = [
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

export default function MonthPicker() {
  const isMobile = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
  });
  return (
    <Box>
      {!isMobile && (
        <Tabs colorScheme="whatsapp" isLazy isFitted>
          <TabList>
            {months.map((month) => (
              <Tab key={month}>{month}</Tab>
            ))}
          </TabList>
          <TabPanels>
            {months.map((month) => (
              <TabPanel>
                <Text>{month}</Text>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      )}

      {isMobile && (
        <Select placeholder="Pick a month">
          {months.map((month) => (
            <option value={month}>{month}</option>
          ))}
        </Select>
      )}
    </Box>
  );
}
