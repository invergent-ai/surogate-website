// Surogate, the desktop app: facts from its README (github.com/invergent-ai/surogates, desktop/README.md),
// read 2026-10-27. The app is released; the install line below is the public one.
const SCRIPT = 'https://surogate.ai/desktop/install.sh';

export const DESKTOP = {
  install: `curl -fsSL ${SCRIPT} | bash`,
  caCert: `curl --cacert company-ca.pem -fsSL ${SCRIPT} | bash -s -- --ca-cert company-ca.pem`,
  uninstall: `curl -fsSL ${SCRIPT} | bash -s -- --uninstall`,
  requirements: [
    'Ubuntu 24.04 LTS or later, on a 64-bit Intel or AMD computer',
    'Hardware virtualization (Intel VT-x or AMD-V) turned on; without it, commands run several times slower',
    'For browsing: Google Chrome, Microsoft Edge, Brave or Vivaldi (not the Snap build of Chromium)',
    'A Surogate account',
  ],
  safe: [
    ['Nothing runs directly on your computer', 'Every command runs in a lightweight virtual machine. A chat\'s folder joins it only while that chat is working.'],
    ['It sees only what you give it', 'The file tools see the chat\'s folder and nothing else of yours. Files you protect stay read-only.'],
    ['You decide what reaches the network', 'Commands reach the package registries they need. For any other site, your local network included, it asks you first.'],
    ['You hold the browser', 'Approve each download and upload, or take the browser over: the agent pauses until you hand it back.'],
    ['Signed updates', 'Every release is signed, and your computer installs only releases signed by Surogate\'s key.'],
  ],
};
