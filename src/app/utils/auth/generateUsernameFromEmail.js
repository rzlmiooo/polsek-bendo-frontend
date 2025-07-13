export default function generateUsernameFromEmail(email) {
    if (!email) return "User";
  
    const localPart = email.split('@')[0]; // 'andi.kurniawan123'
    const nameCandidate = localPart.split(/[.\d_]/)[0]; // ambil 'andi'
    
    if (!nameCandidate) return "User";
  
    return nameCandidate.charAt(0).toUpperCase() + nameCandidate.slice(1);
}
  