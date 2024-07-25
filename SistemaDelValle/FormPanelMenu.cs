using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SistemaDelValle
{
    public partial class FormPanelMenu : Form
    {
        private FormHome formHome;

        int contador = 0;

        public FormPanelMenu(FormHome formHome)
        {
            InitializeComponent();
            hora.Start();
            this.formHome = formHome;
        }


        private void hora_Tick(object sender, EventArgs e)
        {
            // Actualiza el texto con la hora actual
            txtTiempo.Text = DateTime.Now.ToString("HH:mm:ss");

            // Actualiza el texto con la fecha actual
            txtFecha.Text = DateTime.Now.ToString("dddd d 'de' MMMM 'de' yyyy", new System.Globalization.CultureInfo("es-MX"));

            contador++;
            if (contador == 31)
            {
                // txtLeyenda.Text = "El sistema validará su identidad";
            }
            else if (contador == 61)
            {
                contador = 0;
            }
            else if (contador == 1)
            {
                // txtLeyenda.Text = "Coloque su credencial sobre el lector";
            }
        }

        private void btnAlumnos_Click(object sender, EventArgs e)
        {
            formHome.AbrirFormularioHijo(new FormPanelAlumnos(), formHome.panelPrincipal);
        }
    }

}
