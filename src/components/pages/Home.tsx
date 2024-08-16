import { Heading, VStack } from "@chakra-ui/react";

const Home = () => {
  return (
    <div className="text-2xl font-bold font-poppins">
      <Heading>Today</Heading>
      <VStack>
        <p>This is the home page mode</p>
      </VStack>
    </div>
  );
};

export default Home;
