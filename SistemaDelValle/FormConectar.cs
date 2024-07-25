using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SistemaDelValle
{
    public partial class FormConexion : Form
    {

        public FormConexion()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            string ip = Properties.Settings.Default.serverMySQL;
            if(ip == "localhost")
            {
                rbtnLocalhost.Checked = true;
            }
            else
            {
                rbtnServidor.Checked = true;
                string[] segments = ip.Split('.');
                txtIP1.Text = segments[0];
                txtIP2.Text = segments[1];
                txtIP3.Text = segments[2];
                txtIP4.Text = segments[3];
            }

            txtUsuario.Text = Properties.Settings.Default.userMySQL;
            txtPassword.Text = Properties.Settings.Default.passMySQL;
        }

        private void btnOk_Click(object sender, EventArgs e)
        {
            if(rbtnLocalhost.Checked == true)
            {
                Properties.Settings.Default.serverMySQL = "localhost";
            }
            else
            {
                if (!IsValidIP(txtIP1.Text, txtIP2.Text, txtIP3.Text, txtIP4.Text, out string validIP))
                {
                    MessageBox.Show("Se ha introducido una IP invalida", "IP ERROR", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    return;
                }
                
                Properties.Settings.Default.serverMySQL= validIP;
            }

            Properties.Settings.Default.passMySQL = txtPassword.Text;
            Properties.Settings.Default.userMySQL = txtUsuario.Text;


            Properties.Settings.Default.Save();

            Close();
        }

        private void rbtnLocalhost_CheckedChanged(object sender, EventArgs e)
        {
            if (rbtnLocalhost.Checked)
            {
                txtIP1.Enabled = false;
                txtIP2.Enabled = false;
                txtIP3.Enabled = false;
                txtIP4.Enabled = false;
                txtPuerto.Enabled = false;
            } else
            {
                txtIP1.Enabled = true;
                txtIP2.Enabled = true;
                txtIP3.Enabled = true;
                txtIP4.Enabled = true;
                txtPuerto.Enabled = true;
            }            

        }

        static bool IsValidIP(string ip1, string ip2, string ip3, string ip4, out string validIP)
        {
            validIP = $"{ip1}.{ip2}.{ip3}.{ip4}";

            // Verificar si todos los segmentos son números
            if (byte.TryParse(ip1, out byte b1) &&
                byte.TryParse(ip2, out byte b2) &&
                byte.TryParse(ip3, out byte b3) &&
                byte.TryParse(ip4, out byte b4))
            {
                // Verificar si la IP es válida
                IPAddress address;
                return IPAddress.TryParse(validIP, out address);
            }

            return false;
        }
    }
}
