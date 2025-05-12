import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Chip,
  Switch,
  FormControlLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  CircularProgress
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import apiRequest from "../../../Services/apiService";

const AccentSelector = ({ onAccentConfirmed }) => {
  const [selectedAccent, setSelectedAccent] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [showSelector, setShowSelector] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [confirmedSelection, setConfirmedSelection] = useState('');
  const [allAccents, setAllAccents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch accents from API
  useEffect(() => {
    fetchAccents();
  }, []);

  const fetchAccents = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiRequest('GET', '/api/accent/names', null, true);

      if (!response.success) {
        throw new Error('Failed to fetch accents');
      }

      // Define the list of allowed accents
      const allowedAccents = [
        'arabic', 'dutch', 'english', 'french', 'german',
        'korean', 'mandarin', 'portuguese', 'russian', 'spanish', 'turkish'
      ];

      // Filter response data to keep only the allowed accents
      const filteredAccents = (response.data || []).filter(accentName =>
        allowedAccents.includes(accentName.toLowerCase())
      );

      // Then set it to state
      setAllAccents(filteredAccents);
    } catch (err) {
      console.error('Error fetching accents:', err);
      setError('Failed to load accents.');

      // Fallback to dummy data if API call fails
      setAllAccents([
        // Initial accent options
        "Ghanaian",
        "Indian",
        "Philippine",
        "Gulf",
        "French",
        "American",
        // Additional accent options
        "South African",
        "Irish",
        "New Zealand",
        "Nigerian",
        "British",
        "Australian",
        "Canadian",
        "Scottish",
        "Welsh",
        "Jamaican"
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Get displayed accents based on showAll state
  const initialCount = 6; // Number of accents to show initially
  const displayedAccents = showAll
    ? allAccents
    : allAccents.slice(0, initialCount);

  const handleCloseSelector = () => {
    if (selectedAccent || confirmedSelection) {
      setShowWarning(true);
    } else {
      closeSelector();
    }
  };

  const closeSelector = () => {
    setShowSelector(false);
    setSelectedAccent('');
    setConfirmedSelection('');
    setShowWarning(false);
  };

  const handleClearSelection = () => {
    setSelectedAccent('');
    setConfirmedSelection('');
    onAccentConfirmed(null);
  };

  const handleConfirmSelection = () => {
    setConfirmedSelection(selectedAccent);
    onAccentConfirmed(selectedAccent); // Notify parent component
  };

  const handleContinueClose = () => {
    setSelectedAccent('');
    setConfirmedSelection('');
    closeSelector();
    onAccentConfirmed(null); // Clear the selection in parent
  };

  const handleCancelClose = () => {
    setShowWarning(false);
  };

  return (
    <Box sx={{ maxWidth: "800px", width: "100%" }}>
      <Card
        elevation={8}
        sx={{
          mb: 4,
          bgcolor: "#212121",
          borderRadius: 2,
          width: "100%",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2
          }}>
            <Typography
              variant="h6"
              sx={{
                color: "#4CAF50",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 1
              }}
            >
              <LanguageIcon /> Select Your Preferred Accent
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={showSelector}
                  onChange={() => {
                    if (showSelector) {
                      handleCloseSelector();
                    } else {
                      setShowSelector(true);
                    }
                  }}
                  color="success"
                />
              }
              label=""
            />
          </Box>

          {showSelector && (
            <>
              <Divider sx={{ mb: 3, bgcolor: "rgba(255,255,255,0.1)" }} />

              {loading ? (
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  py: 4
                }}>
                  <CircularProgress color="success" />
                  <Typography sx={{ ml: 2, color: "#E0E0E0" }}>
                    Loading accents...
                  </Typography>
                </Box>
              ) : error ? (
                <Box sx={{
                  p: 2,
                  mb: 2,
                  bgcolor: 'rgba(244, 67, 54, 0.1)',
                  borderRadius: 2,
                  border: '1px solid rgba(244, 67, 54, 0.3)'
                }}>
                  <Typography color="error">{error}</Typography>
                </Box>
              ) : (
                <>
                  <Grid container spacing={2} justifyContent="center">
                    {displayedAccents.map((accent) => (
                      <Grid item xs={6} sm={4} md={3} key={accent}>
                        <Chip
                          label={accent}
                          onClick={() => {
                            setSelectedAccent(accent);
                            setConfirmedSelection('');
                          }}
                          sx={{
                            width: '100%',
                            px: 1,
                            py: 2.5,
                            bgcolor: selectedAccent === accent
                              ? "rgba(76, 175, 80, 0.8)"
                              : "rgba(48, 48, 48, 0.8)",
                            color: selectedAccent === accent ? "#FFFFFF" : "#E0E0E0",
                            borderRadius: 2,
                            fontWeight: selectedAccent === accent ? 600 : 400,
                            border: selectedAccent === accent
                              ? "1px solid #4CAF50"
                              : "1px solid rgba(255,255,255,0.1)",
                            '&:hover': {
                              bgcolor: selectedAccent === accent
                                ? "rgba(76, 175, 80, 0.9)"
                                : "rgba(76, 175, 80, 0.2)",
                              transform: "translateY(-2px)",
                              boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
                            },
                            transition: "all 0.3s ease",
                            boxShadow: selectedAccent === accent
                              ? "0 4px 8px rgba(0,0,0,0.3)"
                              : "none",
                            fontSize: "14px"
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>

                  {allAccents.length > initialCount && (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                      {!showAll ? (
                        <Chip
                          icon={<KeyboardArrowDownIcon />}
                          label={`Show More Accents (${allAccents.length - initialCount} more)`}
                          onClick={() => setShowAll(true)}
                          sx={{
                            px: 2,
                            bgcolor: "transparent",
                            color: "#4CAF50",
                            border: "1px solid #4CAF50",
                            '&:hover': {
                              bgcolor: "rgba(76, 175, 80, 0.1)",
                              transform: "translateY(-2px)"
                            },
                            transition: "all 0.3s ease"
                          }}
                        />
                      ) : (
                        <Chip
                          icon={<KeyboardArrowUpIcon />}
                          label="Show Less"
                          onClick={() => setShowAll(false)}
                          sx={{
                            px: 2,
                            bgcolor: "transparent",
                            color: "#9E9E9E",
                            border: "1px solid #9E9E9E",
                            '&:hover': {
                              bgcolor: "rgba(255,255,255,0.05)",
                              transform: "translateY(-2px)"
                            },
                            transition: "all 0.3s ease"
                          }}
                        />
                      )}
                    </Box>
                  )}
                </>
              )}

              {(selectedAccent || confirmedSelection) && (
                <Box sx={{
                  mt: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2
                }}>
                  <Box sx={{
                    p: 2,
                    textAlign: "center",
                    borderRadius: 2,
                    bgcolor: confirmedSelection
                      ? "rgba(76, 175, 80, 0.2)"
                      : "rgba(76, 175, 80, 0.1)",
                    border: confirmedSelection
                      ? "1px solid rgba(76, 175, 80, 0.5)"
                      : "1px solid rgba(76, 175, 80, 0.3)",
                    animation: "fadeIn 0.5s ease-in-out",
                  }}>
                    <Typography variant="body1" sx={{ color: "#E0E0E0" }}>
                      {confirmedSelection
                        ? "Confirmed Accent: "
                        : "Selected Accent: "}
                      <span style={{ color: "#4CAF50", fontWeight: 600 }}>
                        {confirmedSelection || selectedAccent}
                      </span>
                    </Typography>
                  </Box>

                  <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="error"
                        startIcon={<ClearIcon />}
                        onClick={handleClearSelection}
                        sx={{
                          maxWidth: 300,
                          textTransform: 'none',
                          borderRadius: 2,
                          px: 3,
                          py: 1
                        }}
                      >
                        Clear Selection
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="success"
                        startIcon={<CheckIcon />}
                        onClick={handleConfirmSelection}
                        disabled={!selectedAccent || Boolean(confirmedSelection)}
                        sx={{
                          maxWidth: 300,
                          textTransform: 'none',
                          borderRadius: 2,
                          px: 3,
                          py: 1,
                          '&:disabled': {
                            bgcolor: 'rgba(76, 175, 80, 0.5)',
                            color: 'rgba(255, 255, 255, 0.5)'
                          }
                        }}
                      >
                        {confirmedSelection ? "Confirmed" : "Confirm Selection"}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Warning Dialog */}
      <Dialog
        open={showWarning}
        onClose={handleCancelClose}
        PaperProps={{
          sx: {
            bgcolor: "#2d2d2d",
            color: "#e0e0e0"
          }
        }}
      >
        <DialogTitle>Unselect Accent and Close?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#e0e0e0" }}>
            {confirmedSelection
              ? `You have confirmed the "${confirmedSelection}" accent. Do you want to unselect it and close the accent selection?`
              : `You have selected the "${selectedAccent}" accent. Do you want to unselect it and close the accent selection?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancelClose}
            sx={{ color: "#9E9E9E" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleContinueClose}
            color="error"
            variant="contained"
          >
            Unselect and Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AccentSelector;