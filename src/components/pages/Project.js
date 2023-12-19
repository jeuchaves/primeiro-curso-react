import styles from './Project.module.css';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import Message from '../layout/Message';
import ServiceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCard';

function Project() {

	const { id } = useParams();

	const [project, setProject] = useState([]);
	const [services, setServices] = useState([]);
	const [showProjectForm, setShowProjectForm] = useState(false);
	const [showServiceForm, setShowServiceForm] = useState(false);
	const [message, setMessage] = useState();
	const [type, setType] = useState();

	useEffect(() => {
		fetch(`http://localhost:5000/projects/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(resp => resp.json())
			.then((data) => {
				setProject(data);
				setServices(data.services);
			})
			.catch(err => console.log(err));
	}, [id]);

	function editPost(project) {

		// Atualizar a mensagem
		// Fix: Flash mesage não aparece caso haja atualização consecutiva
		setMessage('');

		// Budget Validation
		if (project.budget < project.cost) {
			// mensagem
			setMessage('O orçamento não pode ser menor que o custo do projeto!');
			setType('error');
			return;
		}

		fetch(`http://localhost:5000/projects/${project.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(project)
		})
			.then(resp => resp.json())
			.then((data) => {
				setProject(data);
				setShowProjectForm(false);
				// mensagem
				setMessage('Projeto atualizado!');
				setType('sucess');
			})
			.catch(err => console.log(err));
	}

	function toggleProjectForm() {
		setShowProjectForm(!showProjectForm);
	}

	function toggleServiceForm() {
		setShowServiceForm(!showServiceForm);
	}

	function createService() {

		setMessage('');

		// Último serviço
		const lastService = project.services[project.services.length - 1];
		lastService.id = uuidv4();

		const lastServiceCost = lastService.cost;
		const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

		// Validação de valor máximo
		if (newCost > parseFloat(project.budget)) {
			// mensagem
			setMessage('Orçamento ultrapassado, verifique o valor do serviço!');
			setType('error');
			project.services.pop();
			return false;
		}

		// Adiciona o custo do projeto
		project.cost = newCost;

		// Atualiza o projeto
		fetch(`http://localhost:5000/projects/${project.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(project)
		}).then(resp => resp.json())
			.then((data) => {
				// Exibir o serviço
				setMessage('Serviço adicionado!');
				setType('sucess');
				setShowServiceForm(false);
			})
			.catch(err => console.log(err));
	}

	function removeService(id, cost) {
		
		const servicesUpdate = project.services.filter((service) => service.id !== id);
		const projectUpdated = project;
		
		// Atualiza o custo do projeto
		projectUpdated.services = servicesUpdate;
		projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

		fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(projectUpdated)
		}).then(resp => resp.json())
		.then((data) => {
			setProject(projectUpdated);
			setServices(servicesUpdate);
			setMessage('Serviço removido com sucesso')
			setType('sucess');
		})
		.catch(err => console.log(err));
	}

	return (
		<>
			{project.name ? (
				<div className={styles.projectDetails}>
					<Container customClass="column">
						{message && <Message type={type} msg={message} />}
						<div className={styles.detailsContainer}>
							<h1>Projeto: {project.name}</h1>
							<button className={styles.btn} onClick={toggleProjectForm}>
								{!showProjectForm ? 'Editar Projeto' : 'Fechar'}
							</button>
							{!showProjectForm ? (
								<div className={styles.projectInfo}>
									<p>
										<span>Categoria:</span> {project.category.name}
									</p>
									<p>
										<span>Total de orçamento:</span> R${project.budget}
									</p>
									<p>
										<span>Total utilizado:</span> R${project.cost}
									</p>
								</div>
							) : (
								<div className={styles.projectInfo}>
									<ProjectForm
										handleSubmit={editPost}
										btnText="Concluir edição"
										projectData={project}
									/>
								</div>
							)}
						</div>
						<div className={styles.serviceFormContainer}>
							<h2>Adicione um serviço</h2>
							<button className={styles.btn} onClick={toggleServiceForm}>
								{!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
							</button>
							<div className={styles.projectInfo}>
								{showServiceForm && (
									<ServiceForm handleSubmit={createService} btnText="Adicionar serviço" projectData={project} />
								)}
							</div>
						</div>
						<h2>Serviços</h2>
						<Container customClass="start">
							{services.length > 0 ? (
								services.map((service) => (
									<ServiceCard 
										id={service.id} 
										name={service.name}
										cost={service.cost}
										description={service.description}
										key={service.id}
										handleRemove={removeService}
									/>
								))
							) : (
								<p>Não há serviços cadastrados!</p>
							)}
						</Container>

					</Container>
				</div>
			) : (
				<Loading />
			)}
		</>
	);
}

export default Project;