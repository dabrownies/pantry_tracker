'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { collection, deleteDoc, getDoc, getDocs, query, setDoc, doc } from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data()
      })
    })
    setInventory(inventoryList)
    console.log(inventoryList)
  }

  useEffect(() => {
    updateInventory()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()) {
      const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity: quantity + 1})
    } else {
      await setDoc(docRef, {quantity: 1})
    }

    await updateInventory()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()) {
      const {quantity} = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, {quantity: quantity - 1})
      }
    }

    await updateInventory()
  }

  return (
  <Box
    width="100vw"
    height="100vh"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    gap={2}
  >
    <Modal open={open} onClose={handleClose}>
      <Box
      position="absolute"
      top="50%"
      left="50%"
      width={400}
      bgcolor="#262642"
      border="2px solid gray"
      boxShadow={24}
      padding={4}
      p={4}
      display="flex"
      flexDirection="column"
      gap={3}
      sx={{
        transform: 'translate(-50%, -50%)',
      }}
      >
        <Typography variant="h6" color="white">Add Item</Typography>
        <Stack width="100%" direction="row" spacing={2}>
          <TextField
          variant="outlined"
          bgcolor="white"
          fullWidth
          value={itemName}
          onChange={(e) => {
            setItemName(e.target.value)
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: "white",
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: "#262642",
            },
          }}
          />
          <Button variant="outlined" onClick={() => {
            addItem(itemName)
            setItemName('')
            handleClose()
          }}
          sx= {{
            color: "white",
            borderColor: "gray",
            '&:hover': {
              borderColor: "#262642",
              backgroundColor: "aquamarine",
              color: "black",
            },
          }}
          >
            Add</Button>
        </Stack>
      </Box>
    </Modal>
    <Button variant="outlined" onClick={() => {
      handleOpen()
    }}
    sx= {{
      color: "white",
      borderColor: "gray",
      '&:hover': {
        borderColor: "#010114",
        backgroundColor: "aquamarine",
        color: "black",
      },
    }}
    >
      Add New Item
    </Button>
    <Box border= "1px solid gray">
      <Box 
      width="800px" 
      height="100px" 
      bgcolor="#262642"
      display="flex"
      alignItems="center" 
      justifyContent="center"
      >
        <Typography variant="h2" color="white">
          Pantry Stock
        </Typography>
      </Box>
    
    <Stack width="800px" height="300px" spacing={2} overflow="auto">
      {
        inventory.map(({name, quantity}) => (
          <Box 
            key={name} 
            width="100%"
            minHeight="150px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding={5}
          >
            <Typography variant="h3" color="white" textAlign="center">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography variant="h3" color="white" textAlign="center">
              {quantity}
            </Typography>
            <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={() => {
              addItem(name)
            }}
            sx= {{
              color: "white",
              borderColor: "darkgray",
              '&:hover': {
                borderColor: "#010114",
                backgroundColor: "aquamarine",
                color: "black",
              },
            }}
            >
              Add
            </Button>
            <Button variant="outlined" onClick={() => {
              removeItem(name)
            }}
            sx= {{
              color: "white",
              borderColor: "darkgray",
              '&:hover': {
                borderColor: "#010114",
                backgroundColor: "aquamarine",
                color: "black",
              },
            }}
            >
              Remove
            </Button>
            </Stack>
          </Box>
        ))}
    </Stack>
    </Box>
  </Box>
  )
}
