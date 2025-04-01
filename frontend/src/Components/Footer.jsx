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
        mt: "auto",
        borderTop: "1px solid rgba(81, 81, 81, 0.3)",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{ py: 4 }} justifyContent="center">
          {/* Brand and description */}
          <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "240px" }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
                <MicIcon sx={{ color: "#4CAF50", mr: 1, fontSize: 24 }} />
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700,
                    background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block',
                    fontSize: '1.1rem',
                  }}
                >
                  AccentAI
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "#9E9E9E", mb: 1.5, fontSize: '0.8rem', textAlign: 'center' }}>
                Analyze and improve your accent with AI-powered technology for language learners worldwide.
              </Typography>
              <Stack direction="row" spacing={0.5} justifyContent="center">
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
                      p: 0.5,
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
          
          {/* Footer links - centered alignment */}
          {footerLinks.map((section) => (
            <Grid item xs={6} sm={4} md={2} key={section.section} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  color: "#E0E0E0", 
                  fontWeight: 600, 
                  mb: 1.5,
                  fontSize: '0.85rem',
                  textAlign: 'center'
                }}
              >
                {section.section}
              </Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none', textAlign: 'center' }}>
                {section.links.map((link, index) => (
                  <Box component="li" key={index} sx={{ mb: 0.75 }}>
                    {typeof link === 'string' ? (
                      <Typography
                        sx={{ 
                          color: '#9E9E9E', 
                          fontSize: '0.75rem',
                          textAlign: 'center'
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
                          fontSize: '0.75rem',
                          display: 'block',
                          textAlign: 'center',
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
          
          {/* Contact - centered */}
          <Grid item xs={12} sm={4} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                color: "#E0E0E0", 
                fontWeight: 600, 
                mb: 1.5,
                fontSize: '0.85rem',
                textAlign: 'center'
              }}
            >
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
              <EmailIcon fontSize="small" sx={{ color: '#9E9E9E', mr: 1, fontSize: '0.85rem' }} />
              <Typography 
                variant="body2" 
                component="a" 
                href="mailto:support@accentai.com"
                sx={{ 
                  color: '#9E9E9E', 
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                  '&:hover': { color: '#4CAF50' }
                }}
              >
                support@accentai.com
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.12)" }} />
        
        <Box sx={{ py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography variant="body2" sx={{ color: "#9E9E9E", fontSize: '0.7rem', mx: 'auto', textAlign: 'center' }}>
            © {currentYear} AccentAI. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ color: "#9E9E9E", fontSize: '0.7rem', mx: 'auto', textAlign: 'center' }}>
            Made with ❤️ for language learners worldwide
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;