import {
  Box,
  Flex,
  TextInput,
  Text,
  Button,
  Grid,
  Chip,
  Table,
} from "@mantine/core";

function PracticeDashboard(params) {
  const tableData = {
    head: [
      "Número do pedido",
      "Data do pedido",
      "Situação atual",
      "Qtd. Itens",
      "Valor total do pedido",
      "Método de pagamento",
      "Ações",
    ],
    body: [
      [
        "0123456789",
        "29 / JUN / 2023",
        "A caminho do destino",
        5,
        "R$ 2.120,00",
        "Cartão de crédito",
        "Imprimir Etiqueta",
      ],
      [
        "0123456789",
        "29 / JUN / 2023",
        "A caminho do destino",
        5,
        "R$ 2.120,00",
        "Cartão de crédito",
        "Imprimir Etiqueta",
      ],
      [
        "0123456789",
        "29 / JUN / 2023",
        "A caminho do destino",
        5,
        "R$ 2.120,00",
        "Cartão de crédito",
        "Imprimir Etiqueta",
      ],
      [
        "0123456789",
        "29 / JUN / 2023",
        "A caminho do destino",
        5,
        "R$ 2.120,00",
        "Cartão de crédito",
        "Imprimir Etiqueta",
      ],
      [
        "0123456789",
        "29 / JUN / 2023",
        "A caminho do destino",
        5,
        "R$ 2.120,00",
        "Cartão de crédito",
        "Imprimir Etiqueta",
      ],
      [
        "0123456789",
        "29 / JUN / 2023",
        "A caminho do destino",
        5,
        "R$ 2.120,00",
        "Cartão de crédito",
        "Imprimir Etiqueta",
      ],
      [
        "0123456789",
        "29 / JUN / 2023",
        "A caminho do destino",
        5,
        "R$ 2.120,00",
        "Cartão de crédito",
        "Imprimir Etiqueta",
      ],
      [
        "0123456789",
        "29 / JUN / 2023",
        "A caminho do destino",
        5,
        "R$ 2.120,00",
        "Cartão de crédito",
        "Imprimir Etiqueta",
      ],
      [
        "0123456789",
        "29 / JUN / 2023",
        "A caminho do destino",
        5,
        "R$ 2.120,00",
        "Cartão de crédito",
        "Imprimir Etiqueta",
      ],
    ],
  };

  return (
    <>
      <Box h="100vh" w="100vw" c="#FFFFFF">
        <Box h="9vh" w="100%" bg="#343434">
          <Flex mx="xl" h="100%" align="center" justify="space-between">
            <TextInput
              fz="sm"
              w="30%"
              placeholder="Buscar"
              radius="xl"
              styles={{
                input: {
                  backgroundColor: "transparent",
                  border: "1px solid white", // optional
                  fontFamily: "Open Sans",
                  color: "#FFFFFF",
                },
              }}
            />
            <Flex w="25%" justify="space-around">
              <Text ff="Open Sans" c="#E9DCBE" fz="sm">
                Logística
              </Text>
              <Text ff="Open Sans" fz="sm">
                Comercial
              </Text>
              <Text ff="Open Sans" fz="sm">
                Fábrica
              </Text>
              <Text ff="Open Sans" fz="sm">
                Financeiro
              </Text>
            </Flex>
          </Flex>
        </Box>
        <Box h="91vh" bg="#FFFFFF" c="black">
          <Flex mx="xl" direction="column" gap="lg" py="md">
            <Flex align="center" justify="space-between">
              <Text fw="bold" ff="Open Sans" fz="2rem">
                Dashboard logística
              </Text>
              <Button
                fz="sm"
                c="#FFFFFF"
                bg="#343434"
                w="12%"
                radius="md"
                py="xs"
                px="lg"
                ff="Open Sans"
              >
                Exportar relatório
              </Button>
            </Flex>
            <Grid gutter="sm">
              <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                <Box
                  bd="1px solid #F3F3F3"
                  bdrs="md"
                  p="md"
                  c="black"
                  py="lg"
                  px="xl"
                  style={{
                    boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Flex direction="column">
                    <Text fw="bold" ff="Open Sans" fz="xs">
                      Pacotes em separação
                    </Text>
                    <Text fw="bold" fz="4rem">
                      1.234
                    </Text>
                  </Flex>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                <Box
                  bd="1px solid #F3F3F3"
                  bdrs="md"
                  p="md"
                  c="black"
                  py="lg"
                  px="xl"
                  style={{
                    boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Flex direction="column">
                    <Text fw="bold" ff="Open Sans" fz="xs">
                      Pacotes em separação
                    </Text>
                    <Text fw="bold" color="#C52424" fz="4rem">
                      1.234
                    </Text>
                  </Flex>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                <Box
                  bd="1px solid #F3F3F3"
                  bdrs="md"
                  p="md"
                  c="black"
                  py="lg"
                  px="xl"
                  style={{
                    boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Flex direction="column">
                    <Text fw="bold" ff="Open Sans" fz="xs">
                      Pacotes em separação
                    </Text>
                    <Text fw="bold" fz="4rem">
                      1.234
                    </Text>
                  </Flex>
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                <Box
                  bd="1px solid #F3F3F3"
                  bdrs="md"
                  p="md"
                  c="black"
                  py="lg"
                  px="xl"
                  style={{
                    boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Flex direction="column">
                    <Text fw="bold" ff="Open Sans" fz="xs">
                      Pacotes em separação
                    </Text>
                    <Text fw="bold" fz="4rem">
                      1.234
                    </Text>
                  </Flex>
                </Box>
              </Grid.Col>
            </Grid>
            <Text fw="bold" ff="Open Sans" fz="2rem">
              Últimos pedidos
            </Text>
            <Flex direction="column" gap="md">
              <Flex gap="md">
                <Chip
                  ff="Open Sans"
                  color="#8E8B82"
                  variant="outline"
                  fz="sm"
                  styles={{
                    label: {
                      borderColor: "#8E8B82 ",
                      color: "#8E8B82 ",
                      fontWeight: "bold",
                    },
                  }}
                >
                  Awesome chip
                </Chip>
                <Chip
                  ff="Open Sans"
                  color="#8E8B82"
                  variant="outline"
                  fz="sm"
                  styles={{
                    label: {
                      borderColor: "#8E8B82 ",
                      color: "#8E8B82 ",
                      fontWeight: "bold",
                    },
                  }}
                >
                  Awesome chip
                </Chip>
                <Chip
                  ff="Open Sans"
                  color="#8E8B82"
                  variant="outline"
                  fz="sm"
                  styles={{
                    label: {
                      borderColor: "#8E8B82 ",
                      color: "#8E8B82 ",
                      fontWeight: "bold",
                    },
                  }}
                >
                  Awesome chip
                </Chip>
              </Flex>
              <Table
                styles={{
                  thead: {
                    backgroundColor: "#8E8B82",
                    color: "#F3F3F3",
                  },
                  th: {
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontWeight: "bold",
                    fontFamily: "Open Sans",
                  },
                  td: {
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: "14px",
                    fontFamily: "Open Sans",
                    color: "#000000",
                  },
                }}
                verticalSpacing="md"
                data={tableData}
              />
            </Flex>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
export default PracticeDashboard;
