import pandas as pd  # type: ignore

# Carregar o arquivo CSV com ponto e vírgula como delimitador
caminho_csv = "C:/Users/Ellen/Downloads/Base de Dados Bruta - Alianza G6.csv"
dados = pd.read_csv(caminho_csv, sep=';')  # Especificando o delimitador

# Remover espaços em branco dos nomes das colunas
dados.columns = dados.columns.str.strip()

# Mostrar as colunas do DataFrame
print(dados.columns)  # Para verificar os nomes das colunas

# Extrair as colunas relevantes
siglas_aeroportos = dados[['Sigla ICAO Aeroporto Origem', 'Sigla ICAO Aeroporto Destino']].drop_duplicates().dropna().values.flatten().tolist()
siglas_companhias = dados['Sigla ICAO Empresa Aérea'].drop_duplicates().dropna().tolist()

# Função para gerar comandos de INSERT para aeroportos
def gerar_inserts_aeroportos(siglas):
    inserts = []
    seen = set()  # Conjunto para rastrear siglas já inseridas
    for i, sigla in enumerate(siglas, start=1):
        if sigla not in seen:  # Verifica se a sigla já foi vista
            inserts.append(
                f"INSERT INTO tbAeroporto (idAeroporto, nome, siglaICAO) VALUES ({i}, '{sigla}');"
            )
            seen.add(sigla)  # Adiciona a sigla ao conjunto
    return inserts

# Função para gerar comandos de INSERT para companhias aéreas
def gerar_inserts_companhias(siglas):
    inserts = []
    seen = set()  # Conjunto para rastrear siglas já inseridas
    for i, sigla in enumerate(siglas, start=1):
        if sigla not in seen:  # Verifica se a sigla já foi vista
            inserts.append(
                f"INSERT INTO tbCompanhia (idCompanhia, nome, siglaICAO) VALUES ({i}, '{sigla}');"
            )
            seen.add(sigla)  # Adiciona a sigla ao conjunto
    return inserts

# Gerar os INSERTs
inserts_aeroportos = gerar_inserts_aeroportos(siglas_aeroportos)
inserts_companhias = gerar_inserts_companhias(siglas_companhias)

# Salvar os INSERTs em arquivos .sql
with open("inserts_aeroportos.sql", "w") as f:
    f.write("\n".join(inserts_aeroportos))

with open("inserts_companhias.sql", "w") as f:
    f.write("\n".join(inserts_companhias))

print("Arquivos SQL gerados com sucesso!")
