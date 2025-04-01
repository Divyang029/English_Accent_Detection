import React from "react";
import { 
  Box, 
  Container, 
  Typography, 
  Divider, 
  Grid, 
  Link, 
  IconButton,
  Stack 
} from "@mui/material";
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  Mic as MicIcon
} from "@mui/icons-material";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Social links - all external
  const socialLinks = [
    { icon: <FacebookIcon fontSize="small" />, url: "https://facebook.com" },
    { icon: <TwitterIcon fontSize="small" />, url: "https://twitter.com" },
    { icon: <InstagramIcon fontSize="small" />, url: "https://instagram.com" },
    { icon: <LinkedInIcon fontSize="small" />, url: "https://linkedin.com" },
  ];
  
  const footerLinks = [
    { 
      section: "Features", 
      links: [
        "Accent Analysis",
        "History Tracking", 
        "World Map Visualize"
      ] 
    },
    { 
      section: "Resources",
      links: [
        { name: "Accent Library", url: "https://www.dialectsarchive.com/", external: true },
        { name: "Tutorials", url: "https://www.w3schools.com/", external: true },
        { name: "FAQs", url: "https://www.zendesk.com/blog/the-best-faq-page-examples-and-how-to-make-your-own/", external: true },
        { name: "API Docs", url: "https://www.postman.com/api-platform/api-documentation/", external: true }
      ]
    },
    { 
      section: "Company", 
      links: [
        { name: "About Us", url: "/dashboard/about", external: false },
        { name: "Contact", url: "mailto:gajerarushang04@gmail.com", external: true },
        { name: "Privacy Policy", url: "https://www.privacypolicies.com/live/your-policy-id", external: true },
        { name: "Terms of Service", url: "https://www.termsfeed.com/live/your-terms-id", external: true }
      ] 
    },
  ];

  return (
    <Box 
      component="footer"
      sx={{ 
        bgcolor: "#121212", 
        color: "#fff", 
        width: "100%",
        mt: "auto",
        borderTop: "1px solid rgba(81, 81, 81, 0.3)",
      }}
    >
      {/* Full-width background container */}
      <Box sx={{ width: "90%", px: { xs: 2, sm: 3 } }}>
        <Container 
          maxWidth="xl" 
          sx={{ 
            width: "100%",
            px: { xs: 2, sm: 3, md: 4 }
          }}
        >
          {/* Main footer content with improved spacing */}
          <Grid 
            container 
            spacing={{ xs: 4, md: 5 }} 
            sx={{ 
              py: { xs: 4, md: 5 },
              alignItems: "flex-start",
              justifyContent: "space-between"
            }}
          >
            {/* Brand and description - center aligned on all devices */}
            <Grid 
              item 
              xs={12} 
              sm={6}
              md={3} 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                mb: { xs: 3, sm: 0 }
              }}
            >
              <Box 
                sx={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: 'center', 
                  width: '100%', 
                  maxWidth: { xs: "100%", sm: "280px" }
                }}
              >
                <Box 
                  sx={{ 
                    display: "flex", 
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2
                  }}
                >
                  <MicIcon sx={{ color: "#4CAF50", mr: 1, fontSize: 28 }} />
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 700,
                      background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'inline-block',
                      fontSize: '1.2rem',
                    }}
                  >
                    AccentAI
                  </Typography>
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: "#9E9E9E", 
                    mb: 2.5, 
                    fontSize: '0.85rem', 
                    textAlign: 'center',
                    lineHeight: 1.6,
                    px: 1
                  }}
                >
                  Analyze and improve your accent with AI-powered technology for language learners worldwide.
                </Typography>
                <Stack 
                  direction="row" 
                  spacing={1.5} 
                  sx={{
                    justifyContent: 'center',
                    width: '100%'
                  }}
                >
                  {socialLinks.map((social, index) => (
                    <IconButton 
                      key={index} 
                      component="a" 
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Social link ${index}`}
                      size="small"
                      sx={{ 
                        color: '#9E9E9E',
                        p: 0.8,
                        '&:hover': {
                          color: '#4CAF50',
                          bgcolor: 'rgba(76, 175, 80, 0.08)'
                        }
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  ))}
                </Stack>
              </Box>
            </Grid>
            
            {/* Footer links with consistent center alignment */}
            {footerLinks.map((section) => (
              <Grid 
                item 
                xs={12} 
                sm={4} 
                md={2} 
                key={section.section} 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center',
                  mb: { xs: 3, sm: 0 }
                }}
              >
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    color: "#E0E0E0", 
                    fontWeight: 600, 
                    mb: 2,
                    fontSize: '0.9rem',
                    textAlign: 'center',
                    width: '100%'
                  }}
                >
                  {section.section}
                </Typography>
                <Box 
                  component="ul" 
                  sx={{ 
                    p: 0, 
                    m: 0, 
                    listStyle: 'none', 
                    textAlign: 'center',
                    width: '100%'
                  }}
                >
                  {section.links.map((link, index) => (
                    <Box component="li" key={index} sx={{ mb: 1.5 }}>
                      {typeof link === 'string' ? (
                        <Typography
                          sx={{ 
                            color: '#9E9E9E', 
                            fontSize: '0.8rem',
                            width: '100%'
                          }}
                        >
                          {link}
                        </Typography>
                      ) : (
                        <Link 
                          href={link.url}
                          underline="none"
                          target={link.external ? "_blank" : "_self"}
                          rel={link.external ? "noopener noreferrer" : ""}
                          sx={{ 
                            color: '#9E9E9E', 
                            fontSize: '0.8rem',
                            display: 'block',
                            width: '100%',
                            transition: 'color 0.2s ease',
                            '&:hover': { 
                              color: '#4CAF50',
                              textDecoration: 'none'
                            }
                          }}
                        >
                          {link.name}
                        </Link>
                      )}
                    </Box>
                  ))}
                </Box>
              </Grid>
            ))}
            
            {/* Contact section with center alignment */}
            <Grid 
              item 
              xs={12} 
              sm={4} 
              md={3} 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                mt: { xs: 0, sm: 0 }
              }}
            >
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  color: "#E0E0E0", 
                  fontWeight: 600, 
                  mb: 2,
                  fontSize: '0.9rem',
                  textAlign: 'center',
                  width: '100%'
                }}
              >
                Contact Us
              </Typography>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mb: 1.5,
                  width: '100%'
                }}
              >
                <EmailIcon fontSize="small" sx={{ color: '#9E9E9E', mr: 1, fontSize: '0.9rem' }} />
                <Typography 
                  variant="body2" 
                  component="a" 
                  href="mailto:support@accentai.com"
                  sx={{ 
                    color: '#9E9E9E', 
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    '&:hover': { color: '#4CAF50' }
                  }}
                >
                  support@accentai.com
                </Typography>
              </Box>
            </Grid>
          </Grid>
          
          <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.12)", my: 2 }} />
          
          {/* Copyright section with center alignment */}
          <Box 
            sx={{ 
              py: 3,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              justifyContent: 'center',
              gap: { xs: 3, sm: 50 } // Increased gap values
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                color: "#9E9E9E", 
                fontSize: '0.75rem', 
                textAlign: 'center',
                px: { sm: 2 } // Added horizontal padding on sm+ screens
              }}
            >
              © {currentYear} AccentAI. All rights reserved.
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: "#9E9E9E", 
                fontSize: '0.75rem',
                textAlign: 'center',
                px: { sm: 2 } // Added horizontal padding on sm+ screens
              }}
            >
              Made with ❤️ for language learners worldwide
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;