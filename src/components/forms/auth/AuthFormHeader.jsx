import { Box, Container, Typography } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import Link from "next/link"

export default function AuthFormHeader({title, staticText, linkText, linkHref}){
  return (
    
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
      <HomeIcon sx={{ width: '3rem', height: '3rem', mb: 2 }} />
      <Typography variant="h4" sx={{ fontWeight: "bold", fontFamily: "Roboto Slab", textAlign: 'center', mb: 2 }}>
        {title}
      </Typography>
      {(staticText || linkText) && linkHref && (
        <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary", mb: 2 }}>
          {staticText && <span>{staticText}</span>}
          {linkText && (
            <Link href={linkHref} passHref sx={{ fontWeight: "bold", color: "primary.main", "&:hover": { textDecoration: 'underline' } }}>
              {linkText}
            </Link>
          )}
        </Typography>
      )}
    </Box>
  )
}
