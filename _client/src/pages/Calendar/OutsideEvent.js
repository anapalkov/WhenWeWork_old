import { Box } from "@chakra-ui/react";

function OutsideEvent({ children, ...rest }) {
    return (
        <Box
            p={1}
            bg="#1b4e3f"
            color="white"
            cursor={"pointer"}
            style={{ border: "1px solid black" }}
            {...rest}
        >
            {children}
        </Box>
    );
}

export default OutsideEvent;



