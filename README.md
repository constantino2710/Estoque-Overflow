# React com Vite

Este guia fornece instruções detalhadas para instalação e execução de um projeto React utilizando o Vite.

## 📋 Pré-requisitos
Antes de iniciar, certifique-se de ter os seguintes requisitos instalados em sua máquina:

- [Node.js](https://nodejs.org/en) (inclui o npm - Node Package Manager)
- Git (opcional, caso deseje clonar o repositório via linha de comando)

## 🚀 Instalação

### 1. Clone o repositório
Se você ainda não clonou este repositório, execute o seguinte comando no terminal:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

Em seguida, navegue até a pasta raiz do projeto:

```bash
cd nome-do-projeto
```

### 2. Instale as dependências
Execute o seguinte comando para instalar todas as dependências listadas no `package.json`:

```bash
npm install
```

## ▶️ Execução do projeto

Após a instalação das dependências, inicie o servidor de desenvolvimento executando:

```bash
npm run dev
```

O Vite iniciará o servidor e abrirá o projeto automaticamente no navegador padrão.
Se isso não acontecer, acesse manualmente no seu navegador o endereço:

```
http://localhost:5173
```

## Integrantes:

- Ana Beatriz de Lima Romero (850038)
- Guilherme Cavalcanti de Sá Barreto (849537)
- João Victor Rocha Fernandes (850069)
- João Constantino Pontes Barreto (849518)
- Pedro Henrique Afonso dos Santos (849096)
- Pedro Marques ()
- Julia Vilar ()

## 🛠️ Tecnologias utilizadas
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Node.js](https://nodejs.org/en)
  
![React](https://img.shields.io/badge/react-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Node.js](https://img.shields.io/badge/node.js-393?style=for-the-badge&logo=node.js&logoColor=white)

  
## Histórias

<details>
  <summary>&#x2610; Visualizar o estoque total</summary>
  <br>
  
  __História__: "Como usuário,quero visualizar o estoque total de OPME e packs,para que eu possa saber a quantidade disponível."
  
  <br>

  __Confirmação__: 
  
  - O sistema deve exibir a quantidade total de OPME disponíveis.
  - O sistema deve exibir a quantidade de packs (caixas de 24 unidades).
  - Deve ser possível ver a última atualização do estoque.
  - Caso o estoque esteja abaixo de um limite mínimo, o sistema deve exibir um alerta.
  
  <br>

</details>

<details>
  <summary>&#x2610; Retirar OPME individualmente</summary>
  <br>
  
  __História__: "Como usuário, quero retirar OPME do estoque individualmente, para que eu possa utilizá-los conforme necessário."
  
  <br>

  __Confirmação__: 
  
- O sistema deve permitir selecionar a quantidade de OPME a serem retirados.
- O sistema deve atualizar automaticamente o estoque após a retirada.
- Deve haver uma confirmação antes da retirada para evitar erros.
- Se o usuário tentar retirar mais do que o disponível, o sistema deve exibir um aviso.

  
  <br>

</details>

<details>
  <summary>&#x2610; Retirar packs completos</summary>
  <br>
  
  __História__: "Como usuário, quero retirar packs completos de 24 OPME, para que eu possa facilitar o transporte e uso."
  
  <br>

  __Confirmação__: 
  
- O sistema deve permitir a retirada de packs inteiros (24 unidades por pack).
- O sistema deve atualizar o estoque corretamente, reduzindo os packs e a quantidadetotal de OPME.
- O sistema deve impedir a retirada de um pack se houver menos de 24 OPMEdisponíveis.
- O sistema deve exibir um aviso ao usuário caso o estoque esteja abaixo de um limite mínimo.

  <br>

</details>

<details>
  <summary>&#x2610; Devolver OPME ao estoque</summary>
  <br>
  
  __História__: "Como usuário, quero devolver OPME não utilizados ao estoque, para que a contagem do estoque permaneça precisa."
  
  <br>

  __Confirmação__: 
  
- O sistema deve permitir que o usuário informe a quantidade de OPME a serem devolvidos.
- O sistema deve atualizar automaticamente o estoque após a devolução.
- A devolução não pode ultrapassar a quantidade total disponível no sistema (não pode haver mais estoque do que o máximo permitido).
- Deve haver um histórico registrando todas as devoluções feitas pelos usuários.

  <br>

</details>

<details>
  <summary>&#x2610; Ver histórico de retiradas e devoluções</summary>
  <br>
  
  __História__: "Como usuário, quero ver um histórico das retiradas e devoluções, para que eu possa acompanhar mudanças no estoque."
  
  <br>

  __Confirmação__: 
  
- O sistema deve listar todas as retiradas e devoluções feitas.
- O histórico deve exibir data, horário, usuário e quantidade movimentada.
- O usuário deve conseguir filtrar o histórico por período de tempo e tipo de movimentação.
- Administradores devem conseguir ver o histórico de todos os usuários.

  <br>

</details>

<details>
  <summary>&#x2610;  Pesquisar produtos no estoque</summary>
  <br>
  
  __História__: "Como usuário, quero pesquisar produtos no estoque, para que eu possa localizar rapidamente a quantidade disponível"
  
  <br>

  __Confirmação__: 
  
- O sistema deve ter um campo de busca para localizar itens no estoque.
- A pesquisa deve exibir os resultados em tempo real conforme o usuário digita.
- O usuário deve conseguir filtrar a pesquisa por unidade ou pack.

  <br>

</details>
<details>
  <summary>&#x2610;  Adicionar usuários</summary>
  <br>
  
  __História__: "Como administrador, quero adicionar novos usuários ao sistema, para que eles possam acessar o controle de estoque."
  
  <br>

  __Confirmação__: 
  
- O sistema deve permitir a adição de novos usuários com nome, e-mail e tipo depermissão.
- O sistema deve enviar um e-mail de convite ao novo usuário.

  <br>

</details>
<details>
  <summary>&#x2610;  Remover usuários</summary>
  <br>
  
  __História__: "Como administrador, quero remover usuários do sistema, para que eu possa manter a segurança e controle de acessos."
  
  <br>

  __Confirmação__: 
  
- O administrador deve poder buscar e selecionar um usuário para remoção.
- O sistema deve pedir confirmação antes da exclusão.
- O usuário removido não deve conseguir acessar o sistema novamente.

  <br>

</details>
<details>
  <summary>&#x2610;  Editar dados dos usuários</summary>
  <br>
  
  __História__: "Como administrador, quero editar os dados dos usuários, para que eu possa corrigir informações ou atualizar permissões."
  
  <br>

  __Confirmação__: 
  
- O administrador deve poder alterar nome, e-mail e permissões do usuário.
- As alterações devem ser registradas no histórico do sistema.
- Se as permissões forem alteradas, o usuário deve ser notificado.

  <br>

</details>
<details>
  <summary>&#x2610;  Definir permissões de usuários</summary>
  <br>
  
  __História__: "Como administrador, quero definir permissões de usuários, para que eu possa restringir ou liberar acessos conforme a função."
  
  <br>

  __Confirmação__: 
  
- O sistema deve permitir que o administrador defina quais usuários podem ver e editar o
estoque.
- As permissões devem ser aplicadas imediatamente após a alteração.


  
  <br>

</details>


## 📜 Licença
Este projeto está licenciado sob a [MIT License](LICENSE).

---
