import React, { useState, useEffect, Icon } from 'react';
import api from './api';
import Header from './header';
import { 
    Container, 
    Table, 
    TableRow, 
    TableCell, 
    TableHead,
    Dialog, 
    Button, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    TextField, 
    DialogActions} from '@material-ui/core';
import './style.css';

function App() {
    const [ lista, setLista ] = useState([]); // imutabilidade
    const [ open, setOpen ] = useState(false);
    const [ nome, setNome ] = useState('');
    const [ quantidade, setQuantidade ] = useState('');
    const [ id, setId ] = useState('');
    const [ categoria, setCategoria ] = useState('');
    const [ botaoEditar, setBotaoEditar ] = useState(false);
    const [ botaoAdicionar, setBotaoAdicionar ] = useState(false);

    
    function openModal() {
        setBotaoAdicionar(true);
        setBotaoEditar(false);
        setNome('');
        setQuantidade('');
        setCategoria('');
        setId('');
        setOpen(true);
    };

    function closeModal() {
        setOpen(false);
    };

    function listaEletrodomesticos(){
         api.get('/eletrodomesticos').then((response) => {
            const itens = response.data;
            setLista(itens);
              setNome('');
                setCategoria('');
                setQuantidade('');
                setId('');
        });
    }

    useEffect(() => {
        listaEletrodomesticos();
    }, []);
    
    function addEletrodomesticos(){
        const name = nome;
        const category = categoria;
        const amount = quantidade;

        api.post('/eletrodomesticos', {nome:name, categoria:category, quantidade:amount}).then((response) => {
            setNome('');
            setQuantidade('');
            setOpen(false);
            listaEletrodomesticos();
        });
    }

    function deleteEletrodomesticos(id){
        api.delete(`/eletrodomesticos/${id}`).then((response) => {
            listaEletrodomesticos();
        });
    }
    

    function openEditar(id,nome,quantidade,categoria){
        setBotaoAdicionar(false);
        setBotaoEditar(true);
        setOpen(true);
        setNome(nome);
        setQuantidade(quantidade);
        setId(id);
        setCategoria(categoria);
    }

    function editarEletrodomesticos(){
        api.put(`/eletrodomesticos/${id}`,{nome:nome, categoria:categoria, quantidade:quantidade}).then((response) => {
            setOpen(false);
            setNome('');
            setQuantidade('');
            setCategoria('');
            setId('');
            listaEletrodomesticos();
        });
    }
    return (
        <>
         <Header />
         <Container maxWidth="lg" className="container"> 
            <Table>
                
                <TableHead>
                    <TableRow>
                        <TableCell>Código</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Quantidade</TableCell>
                        <TableCell>Categoria </TableCell>
                    </TableRow>
                </TableHead>
                {lista.map(itens => (
                    <TableRow key={itens.id}>
                        <TableCell>{itens.id}</TableCell>
                        <TableCell>{itens.nome}</TableCell>
                        <TableCell>{itens.quantidade}</TableCell>
                        <TableCell>{itens.categoria}</TableCell>

                        <TableCell>
                            <Button 
                                color="primary"
                                variant="outlined" 
                                onClick={() => openEditar(itens.id,itens.nome,itens.quantidade,itens.categoria)}
                                size="small"> 
                                Editar 
                            </Button>
                            &nbsp;
                            <Button 
                                onClick={() => deleteEletrodomesticos(itens.id)}
                                variant="outlined" 
                                size="small" 
                                color="secondary">Apagar</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </Table>
            <Button 
                onClick={openModal}
                variant="contained" 
                color="primary" 
                style={{marginTop: '20px'}}>
                Adicionar
            </Button>
         </Container>
         <Dialog open={open} onClose={closeModal} fullWidth={true} maxWidth="sm">
            <DialogTitle id="form-dialog-title">Produto</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Digite os dados do Produto.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="nome"
                    label="Nome"
                    autoComplete="off"
                    type="text"
                    fullWidth
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="quantidade"
                    label="Quantidade"
                    autoComplete="off"
                    type="text"
                    fullWidth
                    value={quantidade}
                    onChange={e => setQuantidade(e.target.value)}

                />
                <TextField
                    margin="dense"
                    id="categoria"
                    label="Categoria"
                    autoComplete="off"
                    type="text"
                    fullWidth
                    value={categoria}
                    onChange={e => setCategoria(e.target.value)}

                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal} color="primary">
                    Cancelar
                </Button>
                <Button color="primary" onClick={botaoEditar ? editarEletrodomesticos : addEletrodomesticos}>
                    Salvar
                </Button>
            </DialogActions>
         </Dialog>
        </>
    )
 }

export default App;
