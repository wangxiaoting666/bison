package text;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Scanner;

public class SocketClient {
	
	public static void main(String args[]){
		try {
			Socket socket = new Socket("127.0.0.1",9000);
			BufferedReader buffer = new BufferedReader(new InputStreamReader(socket.getInputStream()));
			PrintWriter print = new PrintWriter(new OutputStreamWriter(socket.getOutputStream()));
			Scanner scan = new Scanner(System.in);
			while(true){
				
				if(scan.nextBoolean()){
					break;
				}
				System.out.println(buffer.readLine());
				print.write(scan.nextLine());
				print.flush();
				
			}
			
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
