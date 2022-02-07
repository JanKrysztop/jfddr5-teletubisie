import { db } from "../config.js";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { PageLayout } from "../components/PageLayout.js";
import { Main } from "../components/Main.js";
import { AnimalDetails } from "../components/AnimalDetails";
import { AnimalTile } from "../components/AnimalTile.js";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";
import "animate.css";

const AnimalListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	overflow: auto;
	width: 100%;
	height: 100%;
`;

export const SearchBar = styled.div`
	/* background-color: pink;
	width: 200px;
	height: 20px; */
`;

export const AnimalsList = () => {
	const [animals, setAnimals] = useState([]);
	const [animalDetailId, setAnimalDetailId] = useState(null);
	const [query, setQuery] = useState("");
	const { pathname } = useLocation();

	const toggleDetailsList = (id) => {
		setAnimalDetailId((oldId) => (oldId === id ? null : id));
	};

	const animalsCollectionName =
		pathname === "/animalslist" ? "animals" : "adopted_animals";

	useEffect(() => {
		const unsub = onSnapshot(
			collection(db, animalsCollectionName),
			(snapshot) => {
				const animalsList = snapshot.docs.map((doc) => doc.data());
				setAnimals(animalsList);
			}
		);
		return () => unsub();
	}, [animalsCollectionName]);

	return (
		<PageLayout>
			<Main>
				<AnimalListWrapper>
					<SearchBar>
						<img
							src={process.env.PUBLIC_URL + "/iconmonstr-magnifier-5-240.png"}
							alt="search"
							style={{ height: "20px", width: "20px" }}
						/>
						<input
							onChange={(event) => setQuery(event.target.value)}
							placeholder="Enter animal's name"
						/>
					</SearchBar>

					<AnimalTile
						animals={animals}
						animalDetailId={animalDetailId}
						query={query}
						toggleDetailsList={toggleDetailsList}
					/>
				</AnimalListWrapper>
			</Main>
		</PageLayout>
	);
};
