import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { motion } from 'framer-motion';
import { NavLink } from "react-router-dom";
import Card from "react-bootstrap/Card";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import logo from '../../assets/img/logo.png'
import foto from '../../assets/img/paulo.jpg'
import './Cards.css'

const Cards = () => {
    const [cards, setCards] = useState([]);
    const [search, setSearch] = useState('');
    const pt = {
        in: { opacity: 1, x: 0 },
        out: { opacity: 0, x: '-100%' }
    }
    const _Get = () => {
        let url = `http://127.0.0.1:5000/cards${(search.length > 3) ? `/any/${search}` : ``}`  
        axios.get(url)
            .then(resp => {
                const { data } = resp
                setCards(data)
            }).catch(error => {
                console.log(error.response)
            })
            .finally(function () { });
    }
    useEffect(() => {
        _Get()
    }, [])
    useEffect(() => { 
        _Get()
    }, [search])

    return (
        <motion.div
            initial={pt.out}
            animate={pt.in}
            exit={pt.out}>
            <Card className='dv-body'>
                <Card.Header className='dv-top-list'>
                    <d className="text-1">Olá, Paulo!</d><br />
                    <d className="text-2">paulo@gmail.com</d><br />
                    <d className="text-4">__________</d><br />
                    <img src={logo} className="logo-img" />
                    <img src={foto} className="foto-img" />
                    <d className="text-3">Feed de Insights</d>
                    <NavLink to="/post" exact className="next"><FontAwesomeIcon icon={faPlus} /></NavLink>
                </Card.Header>
                <Card.Body style={{ padding: '15px' }}>
                    <ul>
                        {cards.map((card) => (
                            <li key={card.id}>
                                <div>
                                    <div className='dv-card'>{card.texto}</div>
                                    {card.tag && card.tag.split(',').map((tag) => (
                                        <div className='dv-tag'>{tag}</div>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                    <footer style={{ padding: '10px', marginLeft: '-5px' }}>
                        <input
                            type="text"
                            value={search}
                            className='input-search'
                            placeholder='Pesquise por termos ou categorias...'
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </footer>
                </Card.Body>
            </Card>
        </motion.div>
    )
}

export default Cards