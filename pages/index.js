import Head from 'next/head'
import logo from '../public/vercel.svg';
import styles from '../styles/Home.module.css'
import { gql } from "@apollo/client";
import client from "../apollo-client";
import { FcLock } from 'react-icons/fc';
import {
  Box,
  Image,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  VStack,
  StackDivider,
  Icon,
  IconProps,
  useColorModeValue,
  createIcon,
} from '@chakra-ui/react';

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query Jobs {
        jobs {
          title
          id
          locationNames
          company{
            name
            logoUrl
          }
          countries{
            name
            isoCode
          }
          tags{
            name
            slug
          }
        }
      }
    `,
  });

  return {
    props: {
      jobs: data.jobs.slice(0, 50),
    },
 };
}



export default function Home({jobs}) {
  return (
    
      <><Head>
      <title>GraphQL Jobs</title>
      <meta name="description" content="Work with GraphQL in a modern startup" />
      <link rel="icon" href="/favicon.ico" />
      <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet" />
    </Head>
    <Container maxW={'20xl'}>
        <Stack
          bgGradient='linear(to-r, gray.300, yellow.400, pink.200)'
          align={'stretch'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}>
          <Box >
            <Heading
              textAlign={'center'}
              fontWeight={500}
              fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
              lineHeight={'110%'}>
              <p>Work with{' '}
                <Text as={'span'} color={'orange.400'}>
                  GraphQL
                </Text></p>
              <p>in a modern startup</p>
            </Heading>
          </Box>
        </Stack>
        <Stack
          align={'stretch'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}>
          <Stack p="4" boxShadow="lg" m="12" borderRadius="sm" divider={<StackDivider borderColor='gray.200' />}>
            {jobs.map((job) => (
              <Stack spacing="24px" direction={{ base: 'column', md: 'row' }} align="stretch" w="full" minH="100px">
                <Stack minW="90px" maxW="90px">
                  <Text fontSize='15' fontWeight="semibold">{job.company.name}</Text>
                  <Stack minW="80px">
                    <Image w='80px' h='80px' src={job.company.logoUrl} alt='company_logo' fallbackSrc='https://via.placeholder.com/150' />
                  </Stack>
                </Stack>
                <Stack minW="350px" alignSelf={'center'} direction={{ base: 'column', md: 'row' }}>
                  <Text alignSelf={'center'} fontSize={{ base: '2xl' }} maxW={'4xl'} fontWeight="bold">
                    {job.title}.
                  </Text>
                </Stack>
                <Stack w="30%" alignSelf={'center'}>
                  {job.tags.slice(0, 3).map((tag) => (<Text fontSize='15'>{tag.name}</Text>))}
                </Stack>
                <Stack w="30%" alignSelf={'center'} direction={{ base: 'column', md: 'row' }}>
                  <Text  fontWeight="semibold">{job.locationNames}</Text>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Container></>
)}