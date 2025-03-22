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
} from "@mui/icons-material";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <FacebookIcon />, url: "#" },
    { icon: <TwitterIcon />, url: "#" },
    { icon: <InstagramIcon />, url: "#" },
    { icon: <LinkedInIcon />, url: "#" },
  ];
  
  const footerLinks = [
    { section: "Company", links: ["About Us", "Our Team", "Careers", "Contact"] },
    { section: "Resources", links: ["Blog", "Documentation", "Tutorials", "FAQs"] },
    { section: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookies", "Compliance"] },
  ];

  return (
    <Box 
      component="footer"
      sx={{ 
        bgcolor: "#121212", 
        color: "#fff", 
        mt: "auto",
        borderTop: "1px solid rgba(81, 81, 81, 0.3)",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ py: 6 }}>
          {/* Brand and description */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                  mb: 2
                }}
              >
                AccentAI
              </Typography>
              <Typography variant="body2" sx={{ color: "#9E9E9E", mb: 2, maxWidth: "90%" }}>
                An advanced AI-powered platform that analyzes speech patterns and helps users identify and improve their accent.
              </Typography>
              <Stack direction="row" spacing={1}>
                {socialLinks.map((social, index) => (
                  <IconButton 
                    key={index} 
                    component="a" 
                    href={social.url}
                    aria-label={`Social link ${index}`}
                    sx={{ 
                      color: '#9E9E9E',
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
          
          {/* Footer links */}
          {footerLinks.map((section) => (
            <Grid item xs={6} sm={4} md={2} key={section.section}>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  color: "#E0E0E0", 
                  fontWeight: 600, 
                  mb: 2 
                }}
              >
                {section.section}
              </Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                {section.links.map((link) => (
                  <Box component="li" key={link} sx={{ mb: 1 }}>
                    <Link 
                      href="#" 
                      underline="none"
                      sx={{ 
                        color: '#9E9E9E', 
                        fontSize: '0.875rem',
                        '&:hover': { 
                          color: '#4CAF50',
                          textDecoration: 'none'
                        }
                      }}
                    >
                      {link}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
          
          {/* Contact */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                color: "#E0E0E0", 
                fontWeight: 600, 
                mb: 2 
              }}
            >
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <EmailIcon fontSize="small" sx={{ color: '#9E9E9E', mr: 1 }} />
              <Typography 
                variant="body2" 
                component="a" 
                href="mailto:info@accentai.com"
                sx={{ 
                  color: '#9E9E9E', 
                  textDecoration: 'none',
                  '&:hover': { color: '#4CAF50' }
                }}
              >
                info@accentai.com
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.12)" }} />
        
        <Box sx={{ py: 3, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: "#9E9E9E" }}>
            © {currentYear} AccentAI. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ color: "#9E9E9E", mt: { xs: 1, sm: 0 } }}>
            Made with ❤️ for language learners worldwide
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;