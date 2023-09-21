import { Box, Flex, Text } from "@chakra-ui/react";
import { AppointmentStatusCode, EVENT_STATUS_COLORS } from "./constants";
import { Appointment } from "./types";

function AppointmentEvent({ appointment }) {
    const { location, status, resource, address } = appointment;
    const background = EVENT_STATUS_COLORS[status];

    return (
        <Box bg={background} p={1} height="100%" color="black">
            <Flex alignItems="center" justifyContent="space-between">
                <Flex>
                    <Text fontSize="xs">{location}</Text>
                </Flex>
                <Flex>
                    <Text fontSize="xs">{resource}</Text>
                </Flex>
            </Flex>
            <Box mt={4}>
                {address.split("\n").map((add) => (
                    <Text fontSize="xs">{add}</Text>
                ))}
            </Box>
        </Box>
    );
}

export default AppointmentEvent;