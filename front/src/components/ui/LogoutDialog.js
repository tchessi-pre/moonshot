import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const LogoutDialog = ({ isOpen, onOpenChange, onLogout }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button className='flex items-center w-full text-lg text-left'>
          <FontAwesomeIcon icon={faSignOutAlt} className='mr-2' />
          Se déconnecter
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmation de déconnexion</DialogTitle>
          <DialogDescription>Êtes-vous sûr de vouloir vous déconnecter ?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} variant='secondary'>
            Annuler
          </Button>
          <Button onClick={onLogout} variant='primary'>
            Se déconnecter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutDialog;
