function Pessoa({nome, foto, idade, peso, altura, genero}) {
    return (
        <div>
            <img src={foto} alt={nome} />
            <h2>{nome}</h2>
            <p>{idade} anos</p>
            <p>Peso: {peso} kg</p>
            <p>Altura: {altura} m</p>
            <p>Gênero: {genero}</p>
        </div>
    );
}

export default Pessoa;