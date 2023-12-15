# Sobre o repositório
Esse repositório visa eu programar juntamente com os vídeos do curso um gerenciador de projetos no React e então adquirir alguns fundamentos do React para posteriormente me permitir desenvolver meu próprio código. Esse repositório será dividido em branchs para cada aula e espero que dê tudo certo.

# O que aconteceu nessa aula

## `useState`

- O **useState** é um hook do React;
- Com ele conseguimos **manusear o estado** de um componente de forma simples;
- Este hook **funciona muito bem com eventos**;
- Podemos **atrelar um evento** a mudança de state;

## Minhas anotações

A importação é feita da seguinte maneira:
```
import { useState } from "react";
```

Para cada parâmetro é necessário adicionar dois parâmetros aninhados no array, um é o valor e o outro é o método de alteração, como por exemplo:
```
const [name, setName] = useState();
```

Para que haja alteração do estado é necessário um gancho para isso, nesse caso para um input é conveniente que seja assim:
```
onChange={(e) => setName(e.target.value)}
```

