import React, { useEffect,useRef, useState } from "react";
import { Link, useNavigate} from "react-router-dom";

import ApiService from "../services/ApiService";

import LLM_Image from '../assests/images/LLM.png';
import logo from '../assests/images/logo.png';
import HomeIcon from "@mui/icons-material/Home";
import {
    AppBar,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    CssBaseline,
    Drawer,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";
import { styled } from '@mui/system';

interface LlmGatewayProps {
    sidebarType: string;
    setSidebarType: (value: string) => void;
    theme: any;
}

const Banner = styled(Box)({
    backgroundImage: `url(${LLM_Image})`,
    backgroundPosition: "center",
    backgroundSize: "auto", // Ensures the full image is visible
    backgroundRepeat: "no-repeat",
    // width: "100vw",
    height: "600px",
    p: 0,
});

const drawerWidth = 200;

const LlmGateway = ({ sidebarType, setSidebarType, theme }: LlmGatewayProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [platforms, setPlatforms] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedPlatform, setSelectedPlatform] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [prompt, setPrompt] = useState("");
    const [responsePrompt, setResponsePrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState("");
    const [context, setContext] = useState("");
    const [customContext, setCustomContext] = useState("");
    const navigate = useNavigate();
    const collapsed = sidebarType === "mini";



    const defaultContexts = [
        "You are a powerful assistant in providing accurate answers based on given context",
        "You are a powerful assistant in converting Text to SQL.Read the following instructions carefully and strictly follow it without fail.",
        "You are a Text to SQL Assistant, Strictly use the context provided only and answer the asked question."
    ];

    useEffect(() => {
        const fetchPlatforms = async () => {
            try {
                const data = await ApiService.getPlatforms();
                setPlatforms(data);
            } catch (error) {
                console.error("Error fetching platforms:", error);
            }
        };
        fetchPlatforms();
    }, []);

    const handlePlatformChange = async (event: any) => {
        const platform = event.target.value;
        setSelectedPlatform(platform);
        setSelectedModel("");
        setContext("");
        setCustomContext("");
        setPrompt("");
        setResponsePrompt("");
        setApiResponse("");
        try {
            const modelsData = await ApiService.getModelsByPlatform(platform);
            setModels(modelsData);
            // setSelectedModel("");
        } catch (error) {
            console.error("Error fetching models:", error);
        }
    };

    const handleModelChange = (event: any) => {
        setSelectedModel(event.target.value);
    };

    const handleSubmit = async () => {
        const payload = {
            method: selectedPlatform, // Take method value from the selected platform
            model: selectedModel,
            context: customContext || context,
            prompt,
        };
        setLoading(true);
        setApiResponse("");
        try {
            const response = await ApiService.getLLMResponse(payload);
            setResponsePrompt(prompt);
            setApiResponse(response?.modelreply || "No response received.");
        } catch (error) {
            console.error("Error sending request:", error);
            setApiResponse("Error generating response. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const formatApiResponse = (response: any) => {
        if (!response) return "";
        // Replace **text** with bold markup
        return response.split(/(\*\*.*?\*\*)/g).map((part: string, index: React.Key | null | undefined) => {
            if (part.startsWith("**") && part.endsWith("**")) {
                return <b key={index}>{part.replace(/\*\*/g, "")}</b>;
            }
            return part;
        });
    };

    useEffect(() => {
        if (apiResponse && cardRef.current) {
            cardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [apiResponse]);

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: "#1a3673",
                boxShadow: "-1px -4px 14px #000",
                height: '64px',
            }}>
                <Toolbar sx={{ justifyContent: "flex-start" }}>
                    {logo && <img src={logo} alt="Logo" style={{ width: 120 }} />}
                    <Typography variant="h6" sx={{
                        flexGrow: 1,
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                        marginLeft: '-80px'
                    }}>
                        Data Intelligence Platform - LLM Gateway
                    </Typography>
                    <Box
                        component={Link}
                        to="/" // Replace with your home route
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            textDecoration: "none",
                            color: "inherit",
                        }}
                    >
                        <IconButton color="inherit" sx={{ color: "#fff" }}>
                            <HomeIcon />
                        </IconButton>
                        <Typography sx={{ fontWeight: "bold", color: "#fff" }}>
                            Home
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" sx={{
                width: drawerWidth, flexShrink: 0, [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    backgroundColor: "#fff",
                    boxShadow: '-1px -3px 10px grey',
                }
            }}>
                <Toolbar />

            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    mt: 8,
                    backgroundColor: "background.default",
                    transition: "margin 0.3s ease",
                }}
            >
                {/* Banner */}
                <Banner />

                {/* Platform Selection */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: 4
                    }}
                >
                    <Typography variant="h5" gutterBottom sx={{ alignItems: 'left', fontWeight: 'bold', fontFamily: 'Roboto, sans-serif', fontSize: "20px", color: "#1a3673" }}>
                        Choose LLM Platform
                    </Typography>
                    <FormControl sx={{ width: 300 }}>
                        {/* <InputLabel id="platform-select-label">Choose LLM Platform</InputLabel> */}
                        <Select
                            value={selectedPlatform}
                            onChange={handlePlatformChange}
                            sx={{ backgroundColor: 'white', textAlign: "left" }}

                        >
                            {platforms.map((platform) => (
                                <MenuItem key={platform} value={platform}>
                                    {platform}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </Box>

                {/* Conditional Dropdowns and Input */}
                {selectedPlatform && (
                    <Paper elevation={3} sx={{ padding: 4, mt: 4, mx: "auto", maxWidth: 600 }}>
                        {/* Select Model */}
                        <Typography variant="h6" mb={2} sx={{ fontWeight: "bold", color: "#1a3673" }}>
                            Ask using {selectedPlatform}
                        </Typography>

                        {/* Model Selection */}
                        <FormControl fullWidth margin="normal">
                            {/* <InputLabel id="model-select-label">Select your model</InputLabel> */}
                            <Select
                                value={selectedModel}
                                onChange={handleModelChange}
                                sx={{ backgroundColor: 'white', textAlign: "left" }}

                            >
                                {models.map((model) => (
                                    <MenuItem key={model} value={model}>{model}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>

                        {/* Context Selection */}
                        <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold", color: "#1a3673" }}>
                            Choose Context or Enter Custom
                        </Typography>
                        <FormControl fullWidth margin="normal">
                            <Select
                                value={context}
                                onChange={(e) => setContext(e.target.value)}
                                sx={{ backgroundColor: 'white' }}
                            >
                                {defaultContexts.map((defaultContext, index) => (
                                    <MenuItem key={index} value={defaultContext}>
                                        {defaultContext}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            placeholder="Enter custom context (optional)"
                            value={customContext}

                            onChange={(e) => setCustomContext(e.target.value)}
                        />

                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', fontFamily: 'Roboto, sans-serif', fontSize: "20px", color: "#1a3673" }}>
                            Add Prompt
                        </Typography>
                        {/* Prompt Input */}
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />

                        <Typography variant="body1" sx={{ mt: 2 }}>
                            <b>Selected model:</b> {selectedModel || "None"}
                        </Typography>
                        {/* Display Requested Prompt */}
                        {responsePrompt && (
                            <Box sx={{ mt: 4 }}>
                                <Typography variant="body1" sx={{ fontWeight: "bold" }}>Requested Prompt:</Typography>
                                <Typography variant="body2">{responsePrompt}</Typography>
                            </Box>
                        )}

                        <Button
                            variant="contained"
                            sx={{ backgroundColor: "#1a3673", mt: 2 }}
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? "Generating..." : "Submit"}
                        </Button>

                        {/* Loader */}
                        {loading && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <CircularProgress size={24} />
                            </Box>
                        )}
                    </Paper>
                )}

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {apiResponse && (
                        <Card ref={cardRef} elevation={3} sx={{ mt: 4, mx: "auto", maxWidth: 670, backgroundColor: '#f5f5f5', border: '1px solid #ddd', borderRadius: 2, boxShadow: 2 }}>
                            <CardContent>
                                <Typography variant="body2" sx={{ whiteSpace: 'pre-line', textAlign: 'left' }}>{formatApiResponse(apiResponse)}</Typography>
                            </CardContent>
                        </Card>
                    )}
                </Box>

            </Box>
        </Box>

    );
};

export default LlmGateway;
