import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { motion } from 'framer-motion';
import { NavLink, useHistory } from "react-router-dom";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { WithContext as ReactTags } from 'react-tag-input';

import '../Cards.css'

const Cards = props => {
    let history = useHistory();

    const [limit, setLimit] = useState(0);
    const [texto, setTexto] = useState('');
    const [tags, setTags] = useState([]);
    const maxLimit = 400;
    const pt = {
        in: { opacity: 1, x: 0 },
        out: { opacity: 0, x: '-100%' }
    }
    const KeyCodes = {
        comma: 188,
        enter: 13
    };
    const delimiters = [KeyCodes.comma, KeyCodes.enter];
    const _Post = () => {
        if (texto.length == 0) return;
        let t = []
        tags.map(e => { t.push(e.text) })
        let url = 'http://127.0.0.1:5000/cards',
            data = {
                texto: texto,
                tags: t.join(',')
            }
        axios.post(url, data)
            .then(resp => {
                const { data } = resp
                console.log(data)
            }).catch(error => {
                console.log(error.response)
            })
            .finally(function () {
                history.goBack()
            });
    }
    const HandleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
    };
    const HandleAddition = tag => {
        setTags([...tags, tag]);
    };
    const HandleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        setTags(newTags);
    };

    useEffect(() => {
        let c = texto.length,
            al = maxLimit - c;
        if (al < 0) {
            setLimit(c)
            setTexto(texto.substring(0, c - 1))
        } else {
            setLimit(c)
        }
    }, [texto])

    return (
        <motion.div
            initial={pt.out}
            animate={pt.in}
            exit={pt.out}>
            <Card className='dv-body'>
                <Card.Header className='dv-top-post'>
                    <d className="upper">Criar</d><br /><label>Insight</label>
                    <NavLink to="/" exact className="back"><FontAwesomeIcon icon={faArrowLeft} /></NavLink>
                </Card.Header>
                <Card.Body style={{ padding: '15px' }}>
                    <div className='dv-post'>
                        <label>Insight</label>
                        <div>
                            <textarea 
                                style={{ resize: 'none' }}
                                value={texto}
                                className='input-texto'
                                placeholder='Escreva aqui seu Insight...'
                                onChange={(e) => setTexto(e.target.value)} /> 
                        </div>
                        <hr />
                        <div className='count'>
                            <>limite de caracteres: {maxLimit - limit}</>
                        </div>
                        <br />
                        <label>Categoria</label>
                        <div>
                            <ReactTags
                                tags={tags}
                                delimiters={delimiters}
                                handleDelete={HandleDelete}
                                handleAddition={HandleAddition}
                                handleDrag={HandleDrag}
                                inputFieldPosition="bottom"
                                placeholder='Aperte "Enter" para criar uma nova tag...'
                                autocomplete
                            />
                        </div>
                        <hr />
                    </div> 
                    <br />
                    <footer>
                        <Button className="btn-1" onClick={_Post}>Publicar</Button>
                    </footer>
                </Card.Body>
            </Card>
        </motion.div>
    )
}

export default Cards