import {
	addDoc,
	collection,
	CollectionReference,
	deleteDoc,
	doc,
	DocumentData,
	DocumentReference,
	DocumentSnapshot,
	getDoc,
	getDocs,
	onSnapshot,
	orderBy,
	query,
	QueryDocumentSnapshot,
	QuerySnapshot,
	serverTimestamp,
	Unsubscribe,
	where,
} from "firebase/firestore";
import { NextPage } from "next";
import { FormEvent, useEffect, useState } from "react";
import { Layout } from "../components";
import { firestore } from "../firebase";

const Firebase: NextPage = () => {
	const [docs, setDocs] = useState<DocumentData[] | null>(null);
	const [filteredDocs, setFilteredDocs] = useState<DocumentData[] | null>(null);
	useEffect(() => {
		//getting all docs
		const collectionRef: CollectionReference<DocumentData> = collection(firestore, "books");
		let unsubscribeData: Unsubscribe = onSnapshot(collectionRef, (snapshot: QuerySnapshot<DocumentData>) => {
			const docs: DocumentData[] = [];
			snapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
				docs.push({ uid: doc.id, ...doc.data() });
			});
			setDocs(docs);
		});
		//getting docs by filtering and ordering them
		const q = query(collectionRef, where("author", "==", "aaaa"), orderBy("title", "asc"));
		const unsubscribeFiltered: Unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
			const docs: DocumentData[] = [];
			snapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
				docs.push({ uid: doc.id, ...doc.data() });
			});
			setFilteredDocs(docs);
		});

		//get a single document
		const docRef: DocumentReference<DocumentData> = doc(firestore, "books", "4ZlZzaU5sRkPlijmh8l2");
		getDoc(docRef).then((doc: DocumentSnapshot<DocumentData>) => {
			console.log(doc.data());
		});
		return () => {
			unsubscribeData();
			unsubscribeFiltered();
		};
	}, []);
	function handleDelete(id: string): void {
		//delete a doc based on autogenerated id
		deleteDoc(doc(firestore, "books", id))
			.then(() => {
				console.log("success :");
			})
			.catch((error) => {
				console.error("error :", error.message);
			});
	}
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		//adding docs
		e.preventDefault();
		const collectionRef: CollectionReference<DocumentData> = collection(firestore, "books");
		addDoc(collectionRef, {
			title: e.target[0].value,
			author: e.target[1].value,
			createdAt: serverTimestamp(),
		})
			.then((success) => {
				console.log("success :", success);
				e.target[0].value = "";
				e.target[1].value = "";
			})
			.catch((error) => {
				console.error("error :", error.message);
			});
	};
	return (
		<Layout title="Firebase 9">
			<ul>
				{docs?.map((doc: DocumentData, i: number) => (
					<li key={doc.uid + i} id={doc.id} onClick={() => handleDelete(doc.uid)}>
						{doc.title}
					</li>
				))}
			</ul>
			<h1>Filtered Values for author = &apos;aaaa&apos;</h1>
			<ul>
				{filteredDocs?.map((doc: DocumentData, i: number) => (
					<li key={doc.uid + i} id={doc.uid} onClick={() => handleDelete(doc.uid)}>
						{doc.title}
					</li>
				))}
			</ul>
			<form onSubmit={handleSubmit}>
				<input type="text" name="title" placeholder="title" required />
				<input type="text" name="author" placeholder="author" required />
				<button type="submit">Submit</button>
			</form>
		</Layout>
	);
};

export default Firebase;
